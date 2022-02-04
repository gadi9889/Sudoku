import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

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

export default function DifficultyPick({setSudokuBoards,username}) {
    let navigate = useNavigate()
    const clickHandle = (difficulty) => {
      fetch(`http://localhost:3001/api/games/?username=${username}&difficulty=${difficulty}`, {
          headers:{
            'Content-Type':'application/json'
          },
          method: 'PATCH'
        }).then(res => res.json())
        .then(data => {
          setSudokuBoards(data)
          navigate('/game')
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
            .:Choose Wisely:.
          </motion.h2>
          <div id="component-options-box">
            <motion.button className='component-links' onClick={() => clickHandle(2)}
              variants={signupVariants}
              whileHover={{scale:1.1}}
              whileTap={{scale:0.9}}
            >
                Easy
            </motion.button>
  
            <motion.button className='component-links' onClick={() => clickHandle(1)}
              variants={loginVariants}
              whileHover={{scale:1.1}}
              whileTap={{scale:0.9}}
            >
              Hard
            </motion.button>
          </div>
        </motion.div>
    )
  
}
