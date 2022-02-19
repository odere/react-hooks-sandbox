import React, { useContext } from "react";

import { ThemeContext } from "./ThemeProvider";

const ChildLevelTwo: React.FC = () => {
  const { color, setColor } = useContext(ThemeContext);

  const onClick = () => {
    setColor("#c71a7f");
  };

  return (
    <div>
      <header>Child Level Two</header>
      <p style={{ color }}>{color}</p>
      <button onClick={onClick}>Child Level Two</button>
    </div>
  );
};

export default ChildLevelTwo;
