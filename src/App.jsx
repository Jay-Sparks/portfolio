import { useState } from 'react'
import './App.css'
import NavBar from '../components/NavBar/NavBar'
import Toggle from '../components/Toggle/Toggle'

export const App = () => {
  const [ isDark, setIsDark ] = useState(false)

  return (
    <div className="App" data-theme={isDark ? "dark" : "light"}>
      <NavBar />
      <Toggle 
        isChecked={isDark}
        handleChange={() => {setIsDark(!isDark)}}
      />
    </div>
  )
}
