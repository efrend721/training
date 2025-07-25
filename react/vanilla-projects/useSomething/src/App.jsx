import { useState, useEffect } from "react";

import "./App.css";

function App() {
  const [name, setName] = useState("Ervis");
  const refButton = useRef(null);

  useEffect(() => {
    console.log("rendered");
    return () => {};
  }, [name]);

  const handleClick = () => {
    setName("Pedro");
  }

  return (
    <div className="App">
      <h1>
        Hola, {name}!
      </h1>
      <button ref={refButton} onClick={handleClick}>
        Change name
      </button>
      <button onClick={() => refButton.current.click()}>
        click the other button to change name
      </button>
    
    
    </div>
  );
}

export default App;
