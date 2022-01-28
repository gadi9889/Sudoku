import React, { useState } from 'react';
import { motion } from 'framer-motion'
import './Login.css'

const labelVariants = {
  start: {
    x:0,
    transition: {
      type:'spring',
      damping:10,
      duration:0.3
    }
  },
  end: {
    x:-50,
    transition: {
      type:'spring',
      damping:10,
      duration:0.3
    }
  }
}

const submitVariants = {
  start: {
    y:0
  },
  hover: {
    scale:[1,1.05],
    transition: {
      repeatType:"reverse",
      repeat:Infinity,
      duration:2
    }
  },
  tap: {
    scale:0.9
  },
  end: {
    y:-250,
    color:'transparent',
    height:250,
    transition: {
      delay:0.1
    }
  }
}

const passwordVariants = {
  start: {
    x:0
  },
  end:{
    x:-50,
    transition: {
      ease:'easeOut'
    }
  }
}

const usernameVariants = {
  start: {
    x:0
  },
  end:{
    x:50,
    transition: {
      ease:'easeOut'
    }
  }
}

const boxVariants = {
  start: {
    y:0
  },
  end: {
    y:400,
    transition: {
      delay:0.5,
      duration:0.5
    }
  }
}

const startAnimationVariants = {
  start: {
    y:-500
  },
  end: {
    y:0,
    transition: {
      duration:0.3,
      type:'spring',
      damping:15
    }
  }
}

export default function Login({show, setShow}) {
  const [wasUsernameClicked, setWasUsernameClicked] = useState(false);
  const [wasPasswordClicked, setWasPasswordClicked] = useState(false);
  const [wasSubmitted, setWasSubmitted] = useState(false);

  return (
    <motion.div
      variants={startAnimationVariants}
      initial='start'
      animate='end'
    >
      <motion.div id="login-container"
        variants={boxVariants}
        initial='start'
        animate={wasSubmitted ? 'end':'start'}
      >
        <h1>Log In</h1>
        <motion.div id="username-container"
          variants={usernameVariants}
          initial='start'
          animate={wasSubmitted ? 'end':'start'}
        >
          <motion.p
            variants={labelVariants}
            initial='start'
            animate={wasUsernameClicked ? 'end':'start'}
          >
            username
          </motion.p>
          <br />
          <input type="text" name="username" id="username" 
            onFocus={() => setWasUsernameClicked(true)} 
            onBlur={() => setWasUsernameClicked(false)}
            autoComplete='off'
          />
          <br />
      </motion.div>
        
      <motion.div id="password-container"
        variants={passwordVariants}
        initial='start'
        animate={wasSubmitted ? 'end':'start'}
      >
        <motion.p
            variants={labelVariants}
            animate={wasPasswordClicked ? 'end':'start'}
          >
            password
          </motion.p>
          <br />
          <input type="text" name="password" id="password" 
            onFocus={() => setWasPasswordClicked(true)} 
            onBlur={() => setWasPasswordClicked(false)}
            autoComplete='off'
          />
      </motion.div>
        
      <motion.input type="submit" value="Log In" 
        variants={submitVariants}
        initial='start'
        whileHover='hover'
        whileTap='tap'
        animate={wasSubmitted ? 'end':'start'}
        onClick={() =>{ setWasSubmitted(true);console.log(wasSubmitted)}}
      />
    </motion.div>
  </motion.div>
  )
}
