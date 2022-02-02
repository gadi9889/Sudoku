import React from 'react';
import { motion } from 'framer-motion';
import {BrowserRouter as Router,Link} from 'react-router-dom'

const mainDivVariants = {
  start: {
    y:'100vh',
    transition: {
      duration:1,
    }
  },
  end: {
    y:0,
    transition: {
      duration:1,
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

export default function Home() {
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
            <Link to='/signup' style={{textDecoration:'none',color:'black'}}>Sign Up</Link>
          </motion.button>

          <motion.button className='component-links'
            variants={loginVariants}
          >
            <Link to='/login' style={{textDecoration:'none',color:'black'}}>Log In</Link>
          </motion.button>
        </div>
      </motion.div>
  )
}
