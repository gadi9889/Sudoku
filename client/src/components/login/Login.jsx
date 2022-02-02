import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion'
import './Login.css'
import { useLinkClickHandler, useNavigate } from 'react-router-dom';

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
    y:'90vh',
    transition: {
      delay:0.5,
      duration:1
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

export default function Login({setCurrentUsername}) {
  const [wasUsernameClicked, setWasUsernameClicked] = useState(false)
  const [wasPasswordClicked, setWasPasswordClicked] = useState(false)
  const [wasSubmitted, setWasSubmitted] = useState(false)
  const [username, setUsername] = useState()
  const [password, setPassword] = useState();

  let navigate = useNavigate()
  
  const getUsername = (e) => {setUsername(e.target.value)}
  const getPassword = (e) => {setPassword(e.target.value)}

  const clickHandle = async () => {
    setWasSubmitted(true)
    await fetch('http://localhost:3001/api/users/login', {
      headers:{
        'Content-Type':'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        username:username,
        password:password
      })
    }).then(res => res.json())
    .then(data => {
      if (data.message == 'welcome') {
        setTimeout(() => {
          setCurrentUsername(username)
          navigate('/menu')
        }, 2000)
      } else {
      setWasSubmitted(false)
      }
    })
    .catch(err => console.log(err))
  }
  

  return (
    <motion.div onClick={(e) => e.stopPropagation()}
      variants={startAnimationVariants}
      initial='start'
      animate='end'
    >
      <motion.div id="login-container"
        variants={boxVariants}
        animate={wasSubmitted ? 'end':'start'}
        exit='end'
      >
        <h1>Log In</h1>
        <motion.div id="username-container"
          variants={usernameVariants}
          animate={wasSubmitted ? 'end':'start'}
        >
          <motion.p
            variants={labelVariants}
            animate={wasUsernameClicked ? 'end':'start'}
          >
            username
          </motion.p>
          <br />
          <input type="text" name="username" id="username" 
            onFocus={() => setWasUsernameClicked(true)} 
            onBlur={() => setWasUsernameClicked(false)}
            onChange={getUsername}
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
            onChange={getPassword}
            autoComplete='off'
          />
      </motion.div>
        
      <motion.input type="submit" value="Log In" 
        variants={submitVariants}
        initial='start'
        whileHover='hover'
        whileTap='tap'
        animate={wasSubmitted ? 'end':'start'}
        onClick={() => clickHandle()}
      />
    </motion.div>
  </motion.div>
  )
}
