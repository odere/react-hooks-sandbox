import React, { useContext } from "react";

import { ThemeContext } from "./ThemeProvider";

const ChildLevelOne: React.FC = (props) => {
  const { children } = props;
  const { color, setColor } = useContext(ThemeContext);

  const onClick = () => {
    setColor("#7cc71a");
  };

  return (
    <div>
      <header>Child Level One</header>
      <p style={{ color }}>{color}</p>
      <button onClick={onClick}>Child Level One</button>
      <div>{children}</div>
    </div>
  );
};

export default ChildLevelOne;
