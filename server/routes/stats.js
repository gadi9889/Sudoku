const router = require('express').Router()

const { stat } = require('fs')
let Stat = require('../models/stat')

router.get('/', async (req,res) => {
    try {
        const stats = await Stat.find()
        res.json(stats)
    } catch (err) {
        res.status(500).json({message:err.message})
    }
})

router.patch('/solved/hard',(req,res) => {
    Stat.findOne({username:req.query.username})
        .then(async(stat) => {
            console.log(req.query.username)
            stat.points += 10
            stat.hard_solved += 1
            await stat.save()
            res.send({message:'stat updated'})
        }).catch(err => {
            res.status(500).json({message:err.message})
        })
})

router.patch('/solved/easy',(req,res) => {
    Stat.findOne({username:req.query.username})
        .then(async(stat) => {
            stat.points += 5
            stat.easy_solved += 1
            await stat.save()
            res.redirect(`/api/games/solved?username=${req.query.username}`)
        }).catch(err => {
            res.status(500).json({message:err.message})
        })
})

module.exports = router