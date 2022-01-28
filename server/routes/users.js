const router = require('express').Router()

let User = require('../models/user.modal')

router.route('/get').get((req,res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err =>  res.status(400).json('Error:- '+err))
})

router.route('/get/:id').get((req,res) => {
    User.findById(req.params.id)
        .then(user => res.json(user))
        .catch(err =>  res.status(400).json('Error:- '+err))
})

router.route('/post').post((req,res) => {
    const username = req.body.username
    const password = req.body.password
    const newUser = new User({username,password})

    newUser.save()
        .then(() => res.json('User added'))
        .catch(err => res.status(400).json('Error:- '+err))
})

router.route('/delete/:id').delete((req,res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json('User deleted'))
        .catch(err => res.status(400).json('Error:- '+err))
})

router.route('/update/:id').update((req,res) => {
    User.findByIdAndUpdate(req.params.id)
        .then((user) => {
            user.username = req.body.username
            user.password = req.body.password

            user.save()
                .then(() => res.json('User updated'))
                .cath(err => res.status(400).json('Error:- '+err))
        })
        .catch(err => res.status(400).json('Error:- '+err))
})

module.exports = router