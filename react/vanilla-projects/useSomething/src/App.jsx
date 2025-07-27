import { useState, useMemo,  } from "react";
import "./App.css";
import { useCallback } from "react";

function App() {
  const [name, setName] = useState("Ervis");
  //const refButton = useRef(null);

  /*useEffect(() => {
    console.log("rendered");
    return () => {};
  }, [name]);
  */

  const changedName = useMemo(() => {
    return `Hola ${name}`;
  }, [name]);


  const handleClick = useCallback(() => {
    setName("Pedro");
  }, [name]);

  return (
    <div className="App">
      <h1>Hola, {name}!</h1>
      <ChangeName changeName={handleClick} />
    </div>
  );
}

function ChangeName ({changeName}){
  
  return (
    <div>
      <button onClick={changeName}>
        Change name
      </button>
    </div>
  );
}

export default App;
