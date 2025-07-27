import { useReducer } from "react";
import "./App.css";

const nameReducer = (state, action) => {
  switch (action.type) {
    case 'Gentleman':
      return { ...state, title: 'Gentleman' };
    case 'Mister':
      return { ...state, title: 'Mister' };
    case 'Miss':
      return { ...state, title: 'Miss' };
    case 'RESET':
      return { ...state, title: '' };
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function App() {
  // Estado inicial como objeto
  const initialState = { title: '', baseName: 'Dev' };
  const [state, dispatch] = useReducer(nameReducer, initialState);
  
  return (
    <div className="App">
      <h1>Hola, {state.title} {state.baseName}!</h1>
      <button onClick={() => dispatch({ type: 'Gentleman' })}>Gentleman</button>
      <button onClick={() => dispatch({ type: 'Mister' })}>Mister</button>
      <button onClick={() => dispatch({ type: 'Miss' })}>Miss</button>
      <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
    </div>
  );
}

export default App;
