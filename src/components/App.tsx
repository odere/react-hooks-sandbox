import React, { useContext, useEffect, useRef } from "react";
import { ThemeContext } from "./ThemeProvider";

const App: React.FC = (props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { children } = props;
  const { color, setColor } = useContext(ThemeContext);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const onColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (setColor) {
      setColor(event.target.value);
    }
  };

  return (
    <div className="App">
      <label htmlFor="changeColor">Color</label>
      <input
        id="changeColor"
        onChange={onColorChange}
        placeholder="fff"
        ref={inputRef}
        tabIndex={0}
        type="text"
      />

      <br />

      <p style={{ color }}>{color}</p>

      <br />

      <div>{children}</div>
    </div>
  );
};

export default App;
