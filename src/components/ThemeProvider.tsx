import React, { useCallback, useState } from "react";

export interface Theme {
  color: string;
  setColor(newState: string): void;
}

export const initialThemeContext: Theme = {
  color: "#fff",
  setColor: (color: string = "#fff") => {
    console.info(`${color} - By default please reassign setColor`);
  },
};

export const ThemeContext = React.createContext<Theme>(initialThemeContext);
ThemeContext.displayName = "ThemeContext";

const ThemeProvider: React.FC = (props) => {
  const { children } = props;
  const [color, setColor] = useState<string>("#fff");

  const setColorState = useCallback(
    (newState: string) =>
      setColor((): string => {
        const regExp = new RegExp("^#");

        if (regExp.test(newState)) {
          return newState;
        }

        return `#${newState}`;
      }),
    []
  );

  return (
    <ThemeContext.Provider value={{ color, setColor: setColorState }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
