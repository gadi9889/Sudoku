import Cube3x3 from './Cube3x3';
import './Game.css'
import { motion,useAnimation } from 'framer-motion';
import {BrowserRouter as Router,useLocation,useNavigate} from 'react-router-dom'
import React,{ useState } from 'react';
import Message from '../message/Message';

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

export default function GameBoard({data,username}) {
    const [board, setboard] = useState(data.displayBoard)
    const [isSolved, setIsSolved] = useState(false);
    const [isFilled, setIsFilled] = useState(false);
    const [messageText, setMessageText] = useState(['Congratulations you are officially AMAZING']);
    const [showMessage, setShowMessage] = useState(false);

    let location = useLocation()
    let navigate = useNavigate()
    
    const updateIsFilled = (bool) => {
        setIsFilled(bool)
    }
    
    const checkHandle = (inputBoard,answerBoard,blankedPositions) => {
        for (let i = 0; i < blankedPositions.length; i++) {
            if (inputBoard[blankedPositions[i]] != answerBoard[blankedPositions[i]]) {
                setMessageText([`check that ${inputBoard[blankedPositions[i]]} in line ${Math.floor(blankedPositions[i]/9)+1}`])
                return setShowMessage(true)
            }
        }
        setShowMessage(true)
        setMessageText(['Congratulations you are officially AMAZING','WOW'])
        return setIsSolved(true)
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

    const messageShow = () => {
        setShowMessage(false)
        if (isSolved) {
            let difficultyString = (data.difficulty == 1)?'hard':'easy'
            setIsFilled(false)
            fetch(`http://localhost:3001/api/stats/solved/${difficultyString}?username=${username}`, {
            headers:{
                'Content-Type':'application/json'
            },
            method: 'PATCH'
          }).then(() => {
                if (location.state.from == 'gamestart') {
                    navigate(-2,{replace:true})
                } else {
                    navigate(-3,{replace:true})
                }
          })
          .catch(err => console.log(err))
        }
    }
    
    const boardReset = (e) => {
        e.stopPropagation()
        setboard(data.displayBoard)
        navigate('/difficultypicker',{state:{from:'reset'}})
    }

    const boardNew = (e) => {
        e.stopPropagation()
        navigate('/difficultypicker',{state:{from:'new'}})
    }

    const backHandle = (e,board) => {
        e.stopPropagation()
        fetch(`http://localhost:3001/api/games/save/?username=${username}`, {
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                displayBoard:board
            }),
            method: 'PATCH'
          }).then(() => {
              if (location.state.from == 'gamestart') {
                navigate(-2,{replace:true})
              } else {
                navigate(-3,{replace:true})
              }
            })
          .catch(err => console.log(err))
    }

    return (
        <>
        <Message showMessage={showMessage} onClick={messageShow} message={messageText[0]} title={messageText[1]}/>
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
                {!isSolved &&(<motion.button className='game-options' onClick={(e) => backHandle(e,board)}
                    whileHover={{scale:1.2,x:10}}
                    whileTap={{x:-5,scaleY:0.8}}
                    exit={{opacity:0}}
                >
                    Back
                </motion.button>)}
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
        </>
    )
}
