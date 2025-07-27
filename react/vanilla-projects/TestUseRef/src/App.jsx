import { useRef } from 'react'
import './App.css'

function App() {
  const textRef = useRef(null)
  const isErvisRef = useRef(true) // Track current state

  const handleClick = () => {
    if (textRef.current) {
      // Using ternary operator for alternating logic
      textRef.current.textContent = isErvisRef.current ? "Hola Pedro" : "Hola Ervis"
      isErvisRef.current = !isErvisRef.current // Toggle the state
    }
  }

  return (
    <div className="app-container">
      <h1 ref={textRef}>Hola Ervis</h1>
      <button onClick={handleClick} className="change-button">
        Toggle greeting
      </button>
    </div>
  )
}

export default App
