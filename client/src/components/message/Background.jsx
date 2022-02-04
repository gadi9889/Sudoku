import React from 'react';
import { motion } from 'framer-motion';
import './message.css'

const backgroundVariants = {
    hidden: {
        opacity:0
    },
    visible: {
        opacity:1
    }
} 

export default function Background({children,onClick}) {
  return (
    <motion.div id='dropdown-background' onClick={(e) => {e.stopPropagation();onClick()}} className='dropdown-background'
        variants={backgroundVariants}
        initial='hidden'
        animate='visible'
        exit='hidden'
    >
        {children}
    </motion.div>
  )
}