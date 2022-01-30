const router = require('express').Router()

let User = require('../models/user.js')
const bcrypt = require('bcryptjs')

router.get('/', async (req,res) => {
    try {
        const users = await User.find()
        res.json(users)
    } catch (err) {
        res.status(500).json({message:err.message})
    }
})

router.post('/signup', async (req,res) => {
    console.log('signup attempt ' + new Date().toLocaleString('en'))
    try {
        const encPassword = await bcrypt.hash(req.body.password,5)
        const newUser = new User({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            username:req.body.username,
            password:encPassword
        })
        await newUser.save()
        res.status(201).json({message:"user added"})
    } catch (err) {
        res.status(400).json({message:err.message})
    }
})

router.post('/login', (req,res) => {
    console.log('login attempt ' + new Date().toLocaleString('en'))
    User.findOne({username:req.body.username})
        .then(user => {
            if (user) {
                bcrypt.compare(req.body.password, user.password, function(err, result) {
                    if (err) {
                        return res.status(500).json({message:err})
                    }
                    if (result) {
                        res.json({message:"welcome"})
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

module.exports = router