import React from 'react';
import Cube3x3 from './Cube3x3';
import './Game.css'

export default function GameBoard() {
    const cubeLayout = () => {
        let cubeList = []
        for (let i = 0; i < 9; i++) {   
            cubeList[i] = <Cube3x3 id={i} />
        }
        return cubeList
    }
    let cubeList = cubeLayout()
    return (
        <div id='game-board' >
            {cubeList.map((cube) => {
                return cube
            })}
        </div>
    )
}
