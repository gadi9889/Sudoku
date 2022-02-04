import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {BrowserRouter as Router,Link, useLocation} from 'react-router-dom'

const mainDivVariants = {
    start: {
        y:'70vh',
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

export default function Menu() {
  let location = useLocation()
  useEffect(() => { 
    console.log(location)
  }, []);
  
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
            Hello!
          </motion.h2>
          <div id="component-options-box">
            <motion.button className='component-links'
              variants={signupVariants}
            >
              <Link to='/leaderboard' style={{textDecoration:'none',color:'black'}}>LeaderBoard</Link>
            </motion.button>
  
            <motion.button className='component-links'
              variants={loginVariants}
            >
              <Link to={'/difficultypicker'} state={{new: false}} style={{textDecoration:'none',color:'black'}}>Game</Link>
            </motion.button>
          </div>
        </motion.div>
    )
}
