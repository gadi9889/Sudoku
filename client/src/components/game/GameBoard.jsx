import Cube3x3 from './Cube3x3';
import './Game.css'
import { displayGrid } from '../../sudokuGenerator/sudokuGenerator';
import { motion,useAnimation } from 'framer-motion';
import { useState } from 'react';

const fullBoard = displayGrid(21)
let displayBoard = [...fullBoard]
for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 2; j++) {
        displayBoard[i][Math.floor(Math.random()*9)] = 0
    }
}
displayBoard = displayBoard.flat()
console.log(displayBoard)

export default function GameBoard() {
    const [board, setboard] = useState(displayBoard);
    
    const cubeLayout = () => {
        let cubeList = []
        for (let i = 0; i < 9; i++) {

            cubeList[i] = <Cube3x3 id={i} displayBoard={displayBoard}/>
        }
        return cubeList
    }

    let cubeList = cubeLayout()
    const endAnimation = useAnimation()

    async function endSequence() {
        await endAnimation.start({ scale: 1.3 })
        await endAnimation.start({ scale:0,opacity:0 })
    }

    return (
        <motion.div style={{display:'flex'}} onClick={(e) => e.stopPropagation()}
            initial={{scaleX:0.5}}
            animate={{scaleX:1}}
            transition={{type:'spring',duration:10,damping:15,stiffness:400}}
        >
            <motion.div id='game-options-container'
                exit={{x:-100}}
                transition={{delay:0.4}}
            >
                <motion.button className='game-options' onClick={(e) => e.stopPropagation()}
                    whileHover={{scale:1.2,x:10}}
                    whileTap={{rotate:180}}
                    exit={{opacity:0}}
                >
                    Reset
                </motion.button>
                <motion.button className='game-options' onClick={(e) => e.stopPropagation()}
                    whileHover={{scale:1.2,x:10}}
                    whileTap={{scaleY:1.1,scaleX:0.9}}
                    exit={{opacity:0}}
                >
                    New
                </motion.button>
                <motion.button className='game-options' onClick={(e) => e.stopPropagation()}
                    whileHover={{scale:1.2,x:10}}
                    whileTap={{x:-5,scaleY:0.8}}
                    exit={{opacity:0}}
                >
                    Back
                </motion.button>
            </motion.div>
            <motion.div id='game-board'
                exit={endSequence}
                animate={endAnimation}
                transition={{duration:1}}
            >
                {cubeList.map((cube) => {
                    return cube
                })}
            </motion.div>
        </motion.div>
    )
}
