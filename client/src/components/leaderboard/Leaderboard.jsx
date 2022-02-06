import React from 'react';
import { motion } from 'framer-motion';

export default function Leaderboard() {
    let list = [{
        position:1,
        username:'rami',
        points:5
    },
    {
        position:2,
        username:'gadi',
        points:2
    }
    ]
    return (
    <motion.div>
        <table style={{borderBottom:'solid black 1px',borderTop:'solid black 1px',borderRadius:'10px',margin:'5vh auto',padding:'10px'}}>
            <thead>
                <tr>
                    <th style={{boxShadow:'0 0 3px',borderRadius:'10px'}}>#</th>
                    <th>username</th>
                    <th>points</th>
                </tr>
            </thead>
            <tbody>
                {list.map((user) => {
                    return (
                        <tr>
                            <th style={{boxShadow:'0 0 3px',borderRadius:'10px'}}>{user.position}</th>
                            <th>{user.username}</th>
                            <th>{user.points}</th>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </motion.div>
    )
}
