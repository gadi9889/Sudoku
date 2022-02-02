import React, { useEffect, useState } from 'react'
import './App.css';
import Login from './components/login/Login';
import {BrowserRouter as Router,useLocation,Routes,Route,useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';
import SignUp from './components/SignUp/SignUp';
import GameBoard from './components/game/GameBoard';
import Home from './components/home/Home';
import Menu from './components/menu/Menu';
import DifficultyPick from './components/game/DifficultyPick'


function App() {
  const [displayBoard, setDisplayBoard] = useState([]);
  const [fullBoard, setFullBoard] = useState([]);
  const [blankedPositions, setBlankedPositions] = useState([]);
  const [currentUsername, setCurrentUsername] = useState();
  
  let location = useLocation()
  let navigate = useNavigate()

  const setSudokuBoards = (displayBoard,fullBoard,blankedPositions) => {
    setDisplayBoard(displayBoard)
    setFullBoard([...fullBoard])
    setBlankedPositions(blankedPositions)
  }

  return (
    <div className="App" onClick={() => {navigate(-1)}}>
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.key}>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/SignUp' element={<SignUp/>}/>
          <Route exact path='/LogIn' element={<Login setCurrentUsername={setCurrentUsername}/>}/>
          <Route exact path='/Game' element={<GameBoard displayBoard={displayBoard} fullBoard={fullBoard} blankedPositions={blankedPositions}/>}/>
          <Route exact path='/menu' element={<Menu/>}/>
          <Route exact path='/difficultypicker' element={<DifficultyPick setSudokuBoards={setSudokuBoards} username={currentUsername}/>}/>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
