import Cube3x3 from './Cube3x3';
import './Game.css'
import { motion,useAnimation } from 'framer-motion';
import {BrowserRouter as Router,useNavigate} from 'react-router-dom'
import React,{ useState } from 'react';

export default function GameBoard({displayBoard,blankedPositions,fullBoard}) {
    const [board, setboard] = useState(displayBoard);
    let navigate = useNavigate()    
    
    const cubeLayout = () => {
        let cubeList = []
        for (let i = 0; i < 9; i++) {
            cubeList[i] = <Cube3x3 id={i} displayBoard={board} setDisplayBoard={setboard} blankedPositions={blankedPositions} />
        }
        return cubeList
    }

    let cubeList = cubeLayout()
    const endAnimation = useAnimation()

    async function endSequence() {
        await endAnimation.start({ scale: 1.3,opacity:0.5 })
        await endAnimation.start({ scale:0,opacity:0 })
    }

    const boardReset = (e) => {
        e.stopPropagation()
        setboard(displayBoard)
        navigate('/game')
        console.log(board)
    }

    const boardNew = (e) => {
        e.stopPropagation()
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
                <motion.button className='game-options' onClick={(e) => boardReset(e)}
                    whileHover={{scale:1.2,x:10}}
                    whileTap={{rotate:180}}
                    exit={{opacity:0}}
                >
                    Reset
                </motion.button>
                <motion.button className='game-options' onClick={(e) => boardNew(e)}
                    whileHover={{scale:1.2,x:10}}
                    whileTap={{scaleY:1.1,scaleX:0.9}}
                    exit={{opacity:0}}
                >
                    New
                </motion.button>
                <motion.button className='game-options' onClick={(e) => {e.stopPropagation();navigate('/difficultypicker')}}
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
