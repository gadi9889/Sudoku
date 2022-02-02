import React from 'react';

export default function DifficultyPick() {
    const clickHandle = () => {
        
    }

    return (
        <motion.div id='home-main-div' onClick={(e) => e.stopPropagation()}
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
          <div id="home-signup-login-box">
            <motion.button className='home-links' onClick={() => clickhandle()}
              variants={signupVariants}
            >
                Easy
            </motion.button>
  
            <motion.button className='home-links' onClick={() => clickhandle()}
              variants={loginVariants}
            >
              Hard
            </motion.button>
          </div>
        </motion.div>
    )
  
}
