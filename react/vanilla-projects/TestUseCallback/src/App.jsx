import { useState, useCallback } from 'react'
import './App.css'

function App() {
  const [isErvis, setIsErvis] = useState(true)

  const toggleName = useCallback(() => {
    setIsErvis(prev => !prev)
  }, [])

  return (
    <>
      <div>
        <h1>{isErvis ? 'Hello Ervis' : 'Hello Pedro'}</h1>
        <button onClick={toggleName}>
          Toggle Name
        </button>
      </div>
    </>
  )
}

export default App
