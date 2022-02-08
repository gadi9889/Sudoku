import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
    x:'-25%',
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
    y:'-50vh',
    height:300,
    scaleX:1.1,
    transition: {
      color:'transparent',
      delay:0.1
    }
  }
}

const passwordVariants = {
  start: {
    x:0
  },
  end:{
    x:'-25%',
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
    x:'25%',
    transition: {
      ease:'easeOut'
    }
  }
}

const startAnimationVariants = {
  start: {
    y:'100vh',
    transition: {
      duration:0.5,
      type:'spring',
      damping:15
      
    }
  },
  end: {
    y:0,
    transition: {
      duration:0.5,
      type:'spring',
      damping:15
    }
  }
}

export default function Login({setCurrentUsername, setToken}) {
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
    await fetch('http://localhost:4000/login', {
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
          setToken(data.accessToken,data.refreshToken)
          navigate('/menu')
        }, 2000);
      } else {
        setWasSubmitted(false)
      }
    })
    .catch(err => console.log(err))
  }
  

  return (
    <motion.div
      variants={startAnimationVariants}
      initial='start'
      animate='end'
      exit='start'
    >
      <div id="login-container" onClick={(e) => e.stopPropagation()}>
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
    </div>
  </motion.div>
  )
}
