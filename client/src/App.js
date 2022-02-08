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
import GameStart from './components/menu/GameStart';
import Leaderboard from './components/leaderboard/Leaderboard';


function App() {
  const [boardData, setBoardData] = useState([]);
  const [currentUsername, setCurrentUsername] = useState();
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  
  let location = useLocation()
  let navigate = useNavigate()

  useEffect(() => {
    let locationArray = ['/','/signup','/login']
    if (!(locationArray.includes(location.pathname))) {
      fetch('http://localhost:4000/verifytoken', {
        headers:{
          'Content-Type':'application/json'
        },
        method: 'POST',
        body: JSON.stringify({
          accessToken:accessToken,
          refreshToken:refreshToken
        })
      }).then(res => {
        if(res.status != 200) return navigate(-1)
      })
      .catch(err => console.log(err))
    } else if (currentUsername != null) {
      fetch('http://localhost:4000/logout', {
        method: 'POST'
      }).then(res => res.json())
      .then(data => {
        setToken(data.accessToken,data.refreshToken)
      })
      .catch(err => console.log(err))
    }
  }, [location]);  

  const setSudokuBoards = (data) => {
    setBoardData(data)
  }

  const setToken = (accessToken,refreshToken) => {
    setAccessToken(accessToken)
    setRefreshToken(refreshToken)
  }

  return (
    <div className="App" onClick={() => {navigate(-1)}}>
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.key}>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/SignUp' element={<SignUp/>}/>
          <Route exact path='/LogIn' element={<Login setCurrentUsername={setCurrentUsername} setToken={setToken}/>}/>
          <Route exact path='/Game' element={<GameBoard data={boardData} username={currentUsername}/>}/>
          <Route exact path='/menu' element={<Menu username={currentUsername}/>}/>
          <Route exact path='/leaderboard' element={<Leaderboard username={currentUsername}/>}/>
          <Route exact path='/gamestart' element={<GameStart username={currentUsername} setSudokuBoards={setSudokuBoards}/>}/>
          <Route exact path='/difficultypicker' element={<DifficultyPick setSudokuBoards={setSudokuBoards} username={currentUsername}/>}/>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
