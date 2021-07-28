import './index.css';
import App from './components/App';
import ChildLevelOne from './components/Child-level-one';
import ChildLevelTwo from './components/Child-level-two';
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');

const root = ReactDOM.createRoot(container as HTMLElement);

root.render(
  <React.StrictMode>
    <App>
      <ChildLevelOne>
        <ChildLevelTwo/>
      </ChildLevelOne>
    </App>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
