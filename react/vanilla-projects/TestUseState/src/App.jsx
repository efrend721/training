import { useState } from 'react'
import './App.css'

function App() {
  const [name, setName] = useState("Ervis")

  const handleNameChange = () => {
    setName(name === "Ervis" ? "Pedro" : "Ervis")
  }

  return (
    <>
      <h1>Hola {name}</h1>
      <button onClick={handleNameChange}>
        Cambiar nombre
      </button>
    </>
  )
}

export default App
