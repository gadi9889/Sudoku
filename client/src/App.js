import React from 'react'
import './App.css';
import Login from './components/login/Login';
import {BrowserRouter as Router,useLocation,Routes,Route,useNavigate } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';
import SignUp from './components/SignUp/SignUp';
import GameBoard from './components/game/GameBoard';
import Home from './components/home/Home';
import Menu from './components/menu/Menu';


function App() {
  let location = useLocation()
  let navigate = useNavigate()

  return (
    <div className="App" onClick={() => {navigate(-1)}}>
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.key}>
          <Route exact path='/' element={<Home/>}/>
          <Route exact path='/SignUp' element={<SignUp/>}/>
          <Route exact path='/LogIn' element={<Login/>}/>
          <Route exact path='/Game' element={<GameBoard/>}/>
          <Route exact path='/menu' element={<Menu/>}/>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
