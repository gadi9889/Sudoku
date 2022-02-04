import Cube3x3 from './Cube3x3';
import './Game.css'
import { motion,useAnimation } from 'framer-motion';
import {BrowserRouter as Router,useNavigate} from 'react-router-dom'
import React,{ useState } from 'react';

const checkVariants = {
    start: {
        opacity:0,
        y:'50%'
    },
    end: {
        opacity:1,
        x:350,
        zIndex:1,
        transition:{
            duration:0.5,
            type:'spring'
        }
    },
    hover: {
        backgroundColor:'#00ff99',
        transition: {
            repeat:Infinity,
            repeatType: "mirror",
            repeatDelay:0.8,
            duration:1
        }
    },
    tap: {
        scale:0.9,
        opacity:0.5
    }
}

export default function GameBoard({data}) {
    const [board, setboard] = useState(data.displayBoard)
    const [isSolved, setIsSolved] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    let navigate = useNavigate()
    
    const updateIsFilled = (bool) => {
        setIsFilled(bool)
    }
    
    const checkHandle = (inputBoard,answerBoard,blankedPositions) => {
        for (let i = 0; i < blankedPositions.length; i++) {
            if (inputBoard[blankedPositions[i]] != answerBoard[blankedPositions[i]]) {
                return false
            }
        }
        return setIsSolved(!isSolved)
    }

    const cubeLayout = () => {
        let cubeList = []
        for (let i = 0; i < 9; i++) {
            cubeList[i] = <Cube3x3 
                            id={i} 
                            displayBoard={board} 
                            setDisplayBoard={setboard} 
                            blankedPositions={isSolved?[-1]:data.blankedPositions} 
                            difficulty={data.difficulty}
                            setIsFilled={updateIsFilled}
                        />
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
        setboard(data.displayBoard)
        navigate(-1)
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
                <motion.button className='game-options' onClick={(e) => {e.stopPropagation();navigate(-1)}}
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
                <motion.button className='game-options'
                    variants={checkVariants}
                    style={{position:'absolute',zIndex:-1,color:'black'}}
                    initial='start'
                    animate={isFilled?'end':'start'}
                    whileHover='hover'
                    whileTap='tap'
                    onClick={() => checkHandle(board,data.fullBoard,data.blankedPositions)}
                >
                    check
                </motion.button>
            </motion.div>
        </motion.div>
    )
}
