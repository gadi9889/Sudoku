import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './leaderboard.css'

const tdVariants = {
    start: {
        y:10,
        scale:1.05
    },
    end: {
        y:0,
        scale:1
    }
}

export default function Leaderboard() {
    const [stats, setStats] = useState([0]);

    useEffect(() => {
        fetch('http://localhost:3001/api/stats/', {
            method: 'GET',
        }).then(res => res.json())
        .then((data) => {
            let arr = [...data]
            for (let i = 0; i < arr.length; i++) {
                for (let j = 0; j < arr.length-1-i; j++) {
                    if (arr[j].points < arr[j+1].points) {
                        let tmp = arr[j+1]
                        arr[j+1] = arr[j]
                        arr[j] = tmp
                    }
                }
            }
            console.log(arr)
            setStats([...arr])
        })
        .catch(err => console.log(err))
    }, []);
    
    return (
    <motion.div id='leaderboard-container'
        initial={{scaleY:0}}
        animate={{scaleY:1}}
        transition={{duration:1}}
    >
        <h2>LeaderBoard</h2>
        <motion.table onClick={(e) => e.stopPropagation()}
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{delay:1,duration:1}}
        >
            <motion.thead
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{delay:1,duration:1}}
            >
                <motion.tr
                    initial={{y:-30}}
                    animate={{y:0}}
                    transition={{delay:1,duration:1}}
                >
                    <th>#</th>
                    <th>username</th>
                    <th>points</th>
                    <th>easy-solved</th>
                    <th>hard-solved</th>
                </motion.tr>
            </motion.thead>
            <motion.tbody
                initial={{opacity:0}}
                animate={{opacity:1}}
                transition={{delay:1.5,duration:1}}
            >
                {stats.map((user ,i) => {
                    return (
                        <motion.tr
                            variants={tdVariants}
                            initial='start'
                            animate='end'
                            transition={{delay:(i+2)/3,duration:0.5}}
                        >
                            <td>{i+1}</td>
                            <td>{user.username}</td>
                            <td>{user.points}</td>
                            <td>{user.easy_solved}</td>
                            <td>{user.hard_solved}</td>
                        </motion.tr>
                    )
                })}
            </motion.tbody>
        </motion.table>
    </motion.div>
    )
}
