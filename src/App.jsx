import { useState } from 'react'
import './App.css'
import NavBar from '../components/NavBar/NavBar'
import Toggle from '../components/Toggle/Toggle'
import Experience from '../views/Experience/Experience'
import Projects from '../views/Projects/Projects'

export const App = () => {
  const [ isDark, setIsDark ] = useState(false)

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <NavBar />
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
