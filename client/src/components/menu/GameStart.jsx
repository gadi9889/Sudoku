import React, { useEffect, useState } from 'react';
import {BrowserRouter as Router,Link, useLocation, useNavigate} from 'react-router-dom'
import { motion } from 'framer-motion';

const mainDivVariants = {
    start: {
        y:'100vh',
        transition: {
        duration:0.2,
        }
    },
    end: {
        y:0,
        transition: {
        duration:0.2,
        type:'spring',
        damping:12,
        }
    }
}

const h2Variants = {
    start:{
        y:'40vh'
    },
    end: {
        y:0,
        transition: {
        delay:0.2,
        duration:1,
        type:'spring',
        damping:12,
        }
    }
}

const signupVariants = {
    start:{
        y:'8vh'
    },
    end: {
        y:0,
        transition: {
        delay:0.35,
        duration:1,
        type:'spring',
        damping:12,
        }
    }
}

const loginVariants = {
    start:{
        y:'-8vh'
    },
    end: {
        y:0,
        transition: {
        delay:0.5,
        duration:1,
        type:'spring',
        damping:12,
        }
    }
}

export default function GameStart({setSudokuBoards,username}) {
    const [isNewUser, setIsNewUser] = useState();

    let navigate = useNavigate()
    let location = useLocation()

    useEffect(() => {
      setIsNewUser(location.state.new)
    }, []);

    const continueHandle = () => {
      fetch(`http://localhost:3001/api/games/?username=${username}&difficulty=${null}&reset=${false}`, {
        headers:{
          'Content-Type':'application/json'
        },
        method: 'PATCH'
      }).then(res => res.json())
      .then(data => {
        setSudokuBoards(data)
        navigate('/game',{state:{from:'gamestart'}})
      })
      .catch(err => console.log(err))
    }
    
    return (
        <motion.div id='component-main-div' onClick={(e) => e.stopPropagation()}
          variants={mainDivVariants}
          initial='start'
          animate='end'
          exit='start'
        >
          <motion.h2
            variants={h2Variants}
          >
            {isNewUser?"Let's start":"Welcome back"}
          </motion.h2>
          <div id="component-options-box">
            {!isNewUser&&(<motion.button className='component-links' onClick={() => continueHandle()}
              variants={signupVariants}
            >
              continue
            </motion.button>)}
  
            <motion.button className='component-links'
              variants={loginVariants}
            >
              <Link to={'/difficultypicker'} state={{from:'newF'}} style={{textDecoration:'none',color:'black'}}>new</Link>
            </motion.button>
          </div>
        </motion.div>
    )
}