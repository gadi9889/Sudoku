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
    origin:"http://localhost:3000"
}))

app.post('/token', (req,res) => {
    const refreshToken = req.body.token
    if (refreshToken == null) return res.status(401).send()
    if (!refreshToken.includs(refreshToken)) return res.status(403).send()
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN,(err,user) => {
        if (err) return res.status(403).send()
        const accessToken = generateAccessToken({name: user.name})
        res.json({accessToken:accessToken})
    })
})

app.delete('/logout' ,(req,res) => {
    res.send({refreshToken:null,accessToken:null})
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
                        const refreshToken = jwt.sign(user,process.env.REFRESH_TOKEN,{expiresIn : '10m'})
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

function generateAccessToken(user) {
    return jwt.sign(user,process.env.ACCESS_TOKEN,{expiresIn : '10m'})
}

app.listen(process.env.AUTH_PORT, () => {
    console.log(`Server is running on port: ${process.env.AUTH_PORT}`)
})