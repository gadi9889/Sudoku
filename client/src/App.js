import React from 'react'
import './App.css';
import Login from './components/login/Login';
import {BrowserRouter as Router,useLocation,Routes,Route} from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';
import SignUp from './components/SignUp/SignUp';
import GameBoard from './components/game/GameBoard';

function App() {
  let location = useLocation();

  return (
    <div className="App">
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.key}>
          <Route exact path='/' element={<Login/>}/>
          <Route exact path='/SignUp' element={<SignUp/>}/>
          <Route exact path='/LogIn' element={<Login/>}/>
          <Route exact path='/Game' element={<GameBoard/>}/>
        </Routes>
      </AnimatePresence>
    </div>
  );
}

export default App;
