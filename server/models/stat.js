const mongoose = require('mongoose')

const Schema = mongoose.Schema

const statSchema = new Schema({
    username: {
        type:String
    },
    points: {
        type:Number,
        default:0
    },
    hard_solved: {
        type:Number,
        default:0
    },
    easy_solved: {
        type:Number,
        default:0
    }
})

const Stat = mongoose.model("Stats", statSchema)

module.exports = Stat