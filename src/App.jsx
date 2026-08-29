import { useState } from 'react';

import { Routes, Route, Navigate } from "react-router-dom";

import './App.css';
import Home from '../views/Home/Home';
import About from '../views/About/About';
import Built from '../views/Built/Built';
import Concepts from '../views/Concepts/Concepts';
// Legacy CV implementation retained for later cleanup.
// import Cv from '../views/Cv/Cv';

export const App = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenu, setIsMenu] = useState(false);

  return (
    <div className="App" data-theme={isDark ? 'dark' : 'light'}>
      <Routes>
        <Route path="/" element={<Home setIsDark={setIsDark} isDark={isDark} isMenu={isMenu} setIsMenu={setIsMenu} />}></Route>
        <Route path="/about" element={<About setIsDark={setIsDark} isDark={isDark} isMenu={isMenu} setIsMenu={setIsMenu}/>}></Route>
        <Route path="/built" element={<Built setIsDark={setIsDark} isDark={isDark} isMenu={isMenu} setIsMenu={setIsMenu}/>} />
        <Route path="/concepts" element={<Concepts setIsDark={setIsDark} isDark={isDark} isMenu={isMenu} setIsMenu={setIsMenu}/>} />
        <Route path="/work" element={<Navigate to="/built" replace />} />
        <Route path="/experiments" element={<Navigate to="/built" replace />} />
        {/* Legacy CV route retained for later cleanup.
        <Route path="/cv" element={<Cv setIsDark={setIsDark} isDark={isDark} isMenu={isMenu} setIsMenu={setIsMenu}/>}/>
        */}
      </Routes>
    </div>
  );
};
