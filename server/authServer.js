require('./config/database').connect()
require('dotenv').config()

const express = require('express')
const app = express()

const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const cors = require('cors')

let User = require('./models/user.js')

app.use(express.json())
app.use(
  cors({
    origin:"*"
}))

app.post('/token', (req,res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.status(401).send()
    if (!refreshToken.includes(refreshToken)) return res.status(403).send()
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN,(err,user) => {
        if (err) return res.status(403).send()
        const refreshToken = jwt.sign(user.toJSON(),process.env.REFRESH_TOKEN)
        const accessToken = generateAccessToken(user)
        res.json({accessToken:accessToken,refreshToken:refreshToken})
    })
})

app.post('/login', (req,res) => {
    console.log('login attempt ' + new Date().toLocaleString('en'))
    User.findOne({username:req.body.username})
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, function(err, result) {
                    if (err) {
                        return res.status(500).json({message:err})
                    }
                    if (result) {
                        const accessToken = generateAccessToken(user)
                        const refreshToken = jwt.sign(user.toJSON(),process.env.REFRESH_TOKEN)
                        res.json({message:"welcome",accessToken:accessToken,refreshToken:refreshToken})
                    }
                    else {
                        res.json({message:"wrong password"})
                    }
                })
            } else {
                res.json({message:"user not found"})
            }
        })
})
app.post('/logout', (req,res) => {
    res.send({accessToken:null,refershToken:null})
})

app.post('/verifytoken', (req,res) => {
    const accessToken = req.body.accessToken
    if(accessToken == null) return res.status(401).send()
    if(!accessToken.includes(accessToken)) return res.status(403).send()
    jwt.verify(accessToken,process.env.ACCESS_TOKEN, (err,user) => {
        if (err) return res.redirect('/token')
        res.status(200).send()
    })
})

function generateAccessToken(user) {
    return jwt.sign(user.toJSON(),process.env.ACCESS_TOKEN,{expiresIn : '15s'})
}

app.listen(process.env.AUTH_PORT, () => {
    console.log(`Server is running on port: ${process.env.AUTH_PORT}`)
})