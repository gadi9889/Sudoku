import { motion } from 'framer-motion';
import React, { useState } from 'react';
import FieldMoudle from './FieldMoudle';
import './signin.css'

const firstPhaseVariants = {
    start: {
        y:0
    },
    end: {
        y:-510,
        transition: {
            duration:1
        }
    }
}

const secondPhaseVariants = {
    start: {
        y:0
    },
    end: {
        y:-830,
        transition: {
            duration:1
        }
    }
}

const endAnimationVariants = {
    start: {
        y:0
    },
    end: {
        y:510,
        transition: {
            delay:0.5,
            duration:1,
            type:'spring',
            damping:10
        }
    }
}

const submitVariants = {
    start:{
        scale:1,
        originX:1.55
    },
    end:{
        scale:1.3,
        y:-420,
        color:'transparent',
        width:'240px',
        height:'370px',
        transition: {
            duration:0.3,
            damping: 20
        }
    }
}

export default function SignIn() {
    const [scrollUpP1, setScrollUpP1] = useState(false);
    const [scrollUpP2, setScrollUpP2] = useState(false);
    const [wasSubmitted, setWasSubmitted] = useState(false);

    const unlockScrollDown = () => {
        if (scrollUpP1) {
            setScrollUpP2(true)
        }
        setScrollUpP1(true)
    }

    const unlockScrollUp = () => {
        if (!scrollUpP2) {
            setScrollUpP1(false)
            return
        }
        setScrollUpP2(false)
    }

  return (
      <motion.div>
        <motion.div id="signin-container"
            variants={endAnimationVariants}
            initial='start'
            animate={wasSubmitted ? 'end':'start'}
        >
            <p class="arrow up" onClick={() => {unlockScrollUp()}}/>
                <br />
            <button class="arrow down" onClick={() => {unlockScrollDown()}}/>
            <motion.div style={{marginBottom:'80px'}}
                variants={firstPhaseVariants}
                initial='start'
                animate={scrollUpP1 ? 'end':'start'}
            >
                <h3 style={{display:'inline-block'}}>lets start from your name</h3>
                <FieldMoudle fieldDivId={"firstname-container"} fieldP={"first name"} fieldName={"firstname"}/>
                <FieldMoudle fieldDivId={"lastname-container"} fieldP={"last name"} fieldName={"lastname"}/>
            </motion.div>
            <motion.div style={{marginBottom:'70px'}}
                variants={scrollUpP2 ? secondPhaseVariants:firstPhaseVariants}
                initial='start'
                animate={scrollUpP1 ? 'end':'start'}
            >
                <h3>so what will your username be?</h3>
                <FieldMoudle fieldDivId={"user-name-container"} fieldP={"username"} fieldName={"user-name"}/>
            </motion.div>
            <motion.div
                variants={scrollUpP2 ? secondPhaseVariants:null}
                initial='start'
                animate='end'
            >
                <h3>almost there!</h3>
                <FieldMoudle fieldDivId={"mail-container"} fieldP={"mail address"} fieldName={"mail"}/>
                <FieldMoudle fieldDivId={"password_container"} fieldP={"password"} fieldName={"password"}/>
                <br />
                <motion.input type="submit" value="Sign In" style={{marginLeft:'35%'}}
                    variants={submitVariants}
                    initial='start'
                    animate={wasSubmitted ? 'end':'start'}
                    onClick={() =>{ setWasSubmitted(true);console.log(wasSubmitted)}}
                />
            </motion.div>
            
        </motion.div>
        
    </motion.div>
  )
}
