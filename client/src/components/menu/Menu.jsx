import React, { useEffect, useState } from 'react';
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

export default function Menu({username}) {
  const [isNewUser, setIsNewUser] = useState(false);
  useEffect(() => { 
    fetch(`http://localhost:3001/api/games/?username=${username}`, {
      method: 'GET'
    }).then(res => res.json())
    .then(data => {
      if (Object.keys(data).length == 4) {
        console.log('aa')
        setIsNewUser(true)//send to app.js
      }
    })
    .catch(err => console.log(err))
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
            Hello {username}!
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
              <Link to={'/gamestart'} state={{new: isNewUser}} style={{textDecoration:'none',color:'black'}}>Game</Link>
            </motion.button>
          </div>
        </motion.div>
    )
}
