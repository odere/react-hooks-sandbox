import React from 'react';

const App: React.FC = (props) => {
  const { children } = props;

  return (
    <div className="App">
      <header className="App-header">
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <div>{children}</div>
    </div>
  );
}

export default App;
