import { motion,AnimatePresence } from 'framer-motion';
import React from 'react';
import Background from './Background'
import './message.css'

const createProductContainerVariants = {
    hidden: {
        scale:0.5,
        y:"-100vh"
    },
    visible: {
        scale:1,
        y:0,
        transition: {
            type:'spring',
            stiffness:80,
            duration:0.5
        }
    },
    exit: {
        y:"40vh",
        opacity:0,
        scale:0,
        transition: {
            duration:0.5
        }
    }
}

export default function Message({showMessage,message, onClick,title}) {
  return (
    <AnimatePresence>
        {showMessage && (
        <Background onClick={onClick}>
            <motion.div id='message-container'
                variants={createProductContainerVariants}
                initial='hidden'
                animate='visible'
                exit='exit'
            >
                <h2 style={{color:'rgb(168, 0, 0)',marginTop:0}}>{(title == null)?'Error!':title}</h2>
                <h4>{message}</h4>
            </motion.div>
        </Background>
        )} 
    </AnimatePresence>
  );
}
