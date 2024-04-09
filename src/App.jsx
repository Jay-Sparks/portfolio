import { useState } from 'react'
import { HiOutlineMenuAlt2 } from "react-icons/hi";
import { CgMenuLeft } from "react-icons/cg";

import NavBar from '../components/NavBar/NavBar'
import Toggle from '../components/Toggle/Toggle'
import Experience from '../views/Experience/Experience'
import Projects from '../components/Projects/Projects'

import './App.css'

export const App = () => {
  const [ isDark, setIsDark ] = useState(false)
  const [ isMenu, setIsMenu ] = useState(false)

  console.log(isMenu);

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <button className="menu" onClick={() => setIsMenu(curr => !curr)}>
        <CgMenuLeft className="menuIcon" />
      </button>
      {isMenu ? 
        <div className="sideBar1">
          <NavBar />
        </div>
      : null}

      <div className="sideBar">
        <NavBar />
      </div>
      <section className='views'>
        <Toggle 
          isChecked={isDark}
          handleChange={() => {setIsDark(!isDark)}}
        />
        <Experience isDark={isDark}/>
        <Projects />
      </section>
    </div>
  )
}
