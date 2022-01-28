import React from 'react'
import './App.css';
import Login from './components/login/Login';
import {BrowserRouter as Router,useLocation,Routes,Route} from 'react-router-dom'
import { AnimatePresence } from 'framer-motion';
import SignIn from './components/SignIn/SignIn';
import GameBoard from './components/game/GameBoard';

function App() {
  let location = useLocation();

  return (
    <div className="App">
      {/* <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.key}>
          <Route exact path='/Home' element={<Login/>}/>
          <Route exact path='/SignUp' element={<Login/>}/>
          <Route exact path='/LogIn' element={<Login/>}/>
          <Route exact path='/Game' element={<Login/>}/>
        </Routes>
      </AnimatePresence> */}
      <GameBoard />
    </div>
  );
}

export default App;
