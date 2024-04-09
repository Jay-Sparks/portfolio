import { useState } from 'react'
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { CgMenuLeft } from "react-icons/cg";

import NavBar from '../components/NavBar/NavBar'
import Toggle from '../components/Toggle/Toggle'
import Experience from '../views/Experience/Experience'
import Projects from '../components/Projects/Projects'

import './App.css'
import Menu from '../Menu/Menu';
import Home from '../views/Home/Home';

export const App = () => {
  const [ isDark, setIsDark ] = useState(false)
  const [ isMenu, setIsMenu ] = useState(false)

  console.log(isMenu);

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <Menu isMenu={isMenu} setIsMenu={setIsMenu}/>
      <Home isDark={isDark} setIsDark={setIsDark}/>
    </div>
  )
}
