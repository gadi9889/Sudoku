const router = require('express').Router()

const bcrypt = require('bcryptjs')
let User = require('../models/user.js')
let SudokuBoard = require('../models/sudokuBoard')
let SudokuGenerator = require('../sudokuGenerator/sudokuGenerator')

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
    if (req.body.password == null || req.body.password.trim().length < 5) {
        return res.status(404).json({message:'minimum password length is 5'})
    }
    try {
        const encPassword = await bcrypt.hash(req.body.password.trim(),5)
        const newUser = new User({
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            username:req.body.username,
            password:encPassword
        })
        await newUser.save()
        const newBoard = new SudokuBoard({
            username:req.body.username,
            fullBoard:SudokuGenerator.fullBoard()
        })
        await newBoard.save()
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