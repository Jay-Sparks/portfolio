import { useState } from 'react';

import './App.css';
import Menu from '../Menu/Menu';
import Home from '../views/Home/Home';

export const App = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenu, setIsMenu] = useState(false);

  console.log(isMenu);

  return (
    <div className="App" data-theme={isDark ? 'dark' : 'light'}>
      <Menu isMenu={isMenu} setIsMenu={setIsMenu} />
      <Home isDark={isDark} setIsDark={setIsDark} />
    </div>
  );
};
