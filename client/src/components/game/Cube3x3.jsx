import React from 'react';
import Cell from './Cell';
import { motion } from 'framer-motion';

export default function Cube3x3({ id,displayBoard,setDisplayBoard,blankedPositions,difficulty,setIsFilled}) {
    const toRowDown = 6
    const maxCellsInACube = 9
    const rowLengthInCube = 3

    const cubeMaker = (id) => {
        let cellList = []
        let rowStart = startingRow(id)
        let colStart = startingCol(id)
        let cells = 1
        return cellSetter(colStart,rowStart,cells,cellList)
    }

    const startingRow = (id) => {
        if (id<rowLengthInCube) {
            return +0
        }
        return startingRow(id/2) + 27
    }

    const startingCol = (id) => {
        return (id%rowLengthInCube)*3
    }

    const isBlanked = (cell,blankedPositions) => {
        for (let i = 0; i < blankedPositions.length; i+=difficulty) {
            if (cell == blankedPositions[i]) {
                return true
            }
        }
        return false
    }

    const cellSetter = (colStart,rowStart,cells,cellList) => {
        if (isBlanked((cells+colStart+rowStart-1),blankedPositions)) {
            cellList[cells-1] = <Cell 
                                    colStart={colStart} 
                                    rowStart={rowStart} 
                                    cell={cells} 
                                    values={displayBoard} 
                                    initialValue={displayBoard[cells+colStart+rowStart-1]} 
                                    setValues={setDisplayBoard} 
                                    isReadOnly={false} 
                                    blankedPositions={blankedPositions} 
                                    setIsFilled={setIsFilled} 
                                    difficulty={difficulty}
                                />
        } else {
            cellList[cells-1] = <Cell colStart={colStart} rowStart={rowStart} cell={cells} values={displayBoard} isReadOnly={true}/>
        }
        if (cells == maxCellsInACube) {
            return cellList
        }
        if (cells%rowLengthInCube == 0) {
            return cellSetter(colStart,rowStart+toRowDown,cells+1,cellList)
        }
        return cellSetter(colStart,rowStart,cells+1,cellList)
    }

    let cellList = cubeMaker(id)

    function initialPosY() {
        if (id < rowLengthInCube) {
            return -100
        } else if(id > 5) {
            return 100
        }
    }
    function initialPosX() {
        if (id % 2 == 0) {
            return -100
        }
        else {
            return 100
        }
    }
    return (
        <>
        <motion.div id={id}
            whileHover={{scale:1.05}}
            initial={{y:initialPosY(),x:initialPosX(),opacity:0}}
            animate={{y:0,x:0,opacity:1}}
            transition={{dealy:0.5,duration:1.5}}
            exit={{opacity:0}}
        >
            {cellList.map((cell) => {
                return cell
            })}
        </motion.div>
        </>
    )
}
