import { useState, useMemo } from 'react'
import './App.css'

function App() {
  const [isErvis, setIsErvis] = useState(true)

  const greeting = useMemo(() => {
    return isErvis ? "Hello Ervis" : "Hello Pedro"
  }, [isErvis])

  const handleClick = () => {
    setIsErvis(!isErvis)
  }

  return (
    <>
      <div>
        <h1>{greeting}</h1>
        <button onClick={handleClick}>
          Toggle Name
        </button>
      </div>
    </>
  )
}

export default App
