const mongoose = require('mongoose')

const Schema = mongoose.Schema

const sudokuBoardSchmea = new Schema ({
    username: {
        type: String,
    },
    fullBoard: {
        type: Array,
        value:[Number]
    },
    displayBoard: {
        type: Array,
        value:[Number],
        default:undefined
    },
    blankedPositions: {
        type: Array,
        value:[Number],
        default:undefined
    },
    difficulty: {
        type: Number,
        default:undefined
    }
})

const SudokuBoard = mongoose.model("SudokuBoards", sudokuBoardSchmea)

module.exports = SudokuBoard