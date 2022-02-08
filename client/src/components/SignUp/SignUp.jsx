import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Message from '../message/Message';
import FieldMoudle from './FieldMoudle';
import './signup.css'

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
    },
    end:{
        scale:1.3,
        y:-420,
        width:'240px',
        height:'370px',
        transition: {
            color:'transparent',
            duration:0.3,
            damping: 20
        }
    }
}

const signupMainDiv = {
    start: {
        y:'100vh',
        transition: {
            duration:1.2,
    }
    },
    end: {
        y:'-7vh',
        transition: {
            duration:1,
            type:'spring',
            damping:12,
        }
    }
}

export default function SignIn() {
    const [scrollUpP1, setScrollUpP1] = useState(false);
    const [scrollUpP2, setScrollUpP2] = useState(false);
    const [wasSubmitted, setWasSubmitted] = useState(false);
    const [showMessage, setShowMessage] = useState(false);
    const [message, setMessage] = useState();
    const [userInput, setUserInput] = useState([]);

    let navigate = useNavigate()

    const getFName = (e) => {userInput[0] = e.target.value}
    const getLName = (e) => {userInput[1] = e.target.value}
    const getUsername = (e) => {userInput[2] = e.target.value}
    const getEmail = (e) => {userInput[3] = e.target.value}
    const getPassword = (e) => {userInput[4] = e.target.value}

    const clickHandle = async (e) => {
        e.stopPropagation()
        setUserInput(userInput)
        setWasSubmitted(true)
        await fetch('http://localhost:3001/api/users/signup', {
          headers:{
            'Content-Type':'application/json'
          },
          method: 'POST',
          body: JSON.stringify({
            firstname:userInput[0],
            lastname:userInput[1],
            email:userInput[3],
            username:userInput[2],
            password:userInput[4]
          })
        }).then(res => res.json())
        .then(data => {
          if (data.message == 'user added') {
            setTimeout(() => {
              navigate('/login')
            }, 2000)
          } else {
            setWasSubmitted(false)
            setShowMessage(true)
            let messageEnd = ((data.message.indexOf(',')!=-1)?data.message.indexOf(','):data.message.length)
            let message = data.message.substring(data.message.indexOf(':')+1,messageEnd)
            setMessage(message)
          }
        })
        .catch(err => console.log(err))
      }

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

    const messageOff = () => {
        setShowMessage(false)
    }

  return (
      <>
      <motion.div
        variants={signupMainDiv}
        initial='start'
        animate='end'
        exit='start'
      >
        <motion.div id="signin-container" onClick={(e) => e.stopPropagation()}
            variants={endAnimationVariants}
            animate={wasSubmitted ? 'end':'start'}
        >
            <p className="arrow up" onClick={() => {unlockScrollUp()}}/>
            <p className="arrow down" onClick={() => {unlockScrollDown()}}/>
            <motion.div style={{marginBottom:'93px'}}
                variants={firstPhaseVariants}
                animate={scrollUpP1 ? 'end':'start'}
            >
                <h3 style={{display:'inline-block'}}>lets start from your name</h3>
                <FieldMoudle fieldDivId={"firstname-container"} fieldP={"first name"} fieldName={"firstname"} onChange={getFName}/>
                <FieldMoudle fieldDivId={"lastname-container"} fieldP={"last name"} fieldName={"lastname"} onChange={getLName}/>
            </motion.div>
            <motion.div style={{marginBottom:'100px'}}
                variants={scrollUpP2 ? secondPhaseVariants:firstPhaseVariants}
                animate={scrollUpP1 ? 'end':'start'}
            >
                <h3>so what will your username be?</h3>
                <FieldMoudle fieldDivId={"user-name-container"} fieldP={"username"} fieldName={"user-name"} onChange={getUsername}/>
            </motion.div>
            <motion.div
                variants={scrollUpP2 ? secondPhaseVariants:null}
                animate='end'
            >
                <h3>almost there!</h3>
                <FieldMoudle fieldDivId={"mail-container"} fieldP={"mail address"} fieldName={"mail"} onChange={getEmail}/>
                <FieldMoudle fieldDivId={"password_container"} fieldP={"password"} fieldName={"password"} onChange={getPassword}/>
                <br />
                <motion.input type="submit" value="Sign In"
                    variants={submitVariants}
                    animate={wasSubmitted ? 'end':'start'}
                    onClick={(e) =>clickHandle(e)}
                />
            </motion.div>
            
        </motion.div>
    </motion.div>
    <Message showMessage={showMessage} message={message} onClick={messageOff}/>
    </>
  )
}
