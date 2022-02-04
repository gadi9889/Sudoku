const router = require('express').Router()

let SudokuBoard = require('../models/sudokuBoard')
let SudokuGenerator = require('../sudokuGenerator/sudokuGenerator')
let sudokuPosGenerator = require('../sudokuGenerator/sudokuPosGenerator')

router.patch('/', (req,res) => {
    SudokuBoard.findOne({username:req.query.username})
        .then(async(board) => {
            if (board.displayBoard == undefined) {
                let posArray = sudokuPosGenerator.blankedPositionsArray()
                board.displayBoard = SudokuGenerator.displayGrid(req.query.difficulty,board.fullBoard,posArray)
                board.blankedPositions = posArray
                board.difficulty = parseInt(req.query.difficulty)
                await board.save()
            }
            res.json(board)
        }).catch(err => {
            res.status(500).json({message:err.message})
        })
})

router.patch('/new/' , async(req,res) => {
    await SudokuBoard.findOne({username:req.query.username})
        .then(async(board) => {
            let posArray = sudokuPosGenerator.blankedPositionsArray()
            board.fullBoard = SudokuGenerator.fullBoard()
            board.displayBoard = SudokuGenerator.displayGrid(req.query.difficulty,board.fullBoard,posArray)
            board.blankedPositions = posArray
            await board.save()
            res.json(board)
        })
})

router.patch('/save', async(req,res) => {
    await SudokuBoard.findOne({username:req.query.username})
        .then(async(board) => {
            board.displayBoard = req.body.displayBoard
            await board.save()
            res.json({message:"progress saved"})
        })
})

router.get('/', async(req,res) => {
    const sudokuBoard = await SudokuBoard.findOne({username:req.query.username})
    res.json(sudokuBoard.fullBoard)
})

module.exports = router