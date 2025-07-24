import { useState, useEffect } from "react";
function MagicButton({ onValueChange, initialValue = 0 }) {
  const [count, setCount] = useState(initialValue);

  const handleButtonClick = () => {
    const newValue = 10;
    setCount(newValue);
    onValueChange?.(newValue);
  };

  useEffect(() => {
    console.log(`Count update to : ${count}`)
  }, [count]);

  return (
    <div>
      <button onClick={handleButtonClick} aria-label="Transformar a 10">
        Transformemos A : 
      </button>
      <span>
        {count}
      </span>
    </div>
  );
}
export default MagicButton;
