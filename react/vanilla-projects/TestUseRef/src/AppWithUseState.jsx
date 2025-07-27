import { useState } from 'react'
import './App.css'

function AppWithUseState() {
  const [greeting, setGreeting] = useState("Hola Ervis")

  const handleClick = () => {
    setGreeting("Hola Pedro")
  }

  return (
    <div className="app-container">
      <h1>{greeting}</h1>
      <button onClick={handleClick} className="change-button">
        Click to change greeting
      </button>
    </div>
  )
}

export default AppWithUseState
