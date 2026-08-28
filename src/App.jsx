import { useState } from 'react';

import { Routes, Route } from "react-router-dom";

import './App.css';
import Home from '../views/Home/Home';
import About from '../views/About/About';
import Experiments from '../views/Experiments/Experiments';
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
        <Route path="/work" element={<Experiments setIsDark={setIsDark} isDark={isDark} isMenu={isMenu} setIsMenu={setIsMenu}/>} />
        <Route path="/experiments" element={<Experiments setIsDark={setIsDark} isDark={isDark} isMenu={isMenu} setIsMenu={setIsMenu}/>} />
        {/* Legacy CV route retained for later cleanup.
        <Route path="/cv" element={<Cv setIsDark={setIsDark} isDark={isDark} isMenu={isMenu} setIsMenu={setIsMenu}/>}/>
        */}
      </Routes>
    </div>
  );
};
