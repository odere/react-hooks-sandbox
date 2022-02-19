import './index.css';
import App from './components/App';
import ThemeProvider from './components/ThemeProvider';
import ChildLevelOne from './components/Child-level-one';
import ChildLevelTwo from './components/Child-level-two';
import React from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import Select from './components/Select';

const container = document.getElementById('root');

const root = ReactDOM.createRoot(container as HTMLElement);

root.render(
  <React.StrictMode>
    <div className="ThemeContextExampleContainer">
      <Select />
    </div>

    <div className="ThemeContextExampleContainer scroll-container">
      <div>
        <h4>Context for all</h4>
        <ThemeProvider>
          <App>
            <ChildLevelOne>
              <ChildLevelTwo/>
            </ChildLevelOne>
          </App>
        </ThemeProvider>
      </div>

      <div>
        <h4>Context for ChildLevelOne, ChildLevelTwo </h4>
        <App>
          <ThemeProvider>
            <ChildLevelOne>
              <ChildLevelTwo/>
            </ChildLevelOne>
          </ThemeProvider>
        </App>
      </div>

      <div>
        <h4>Context for ChildLevelTwo </h4>
        <App>
          <ChildLevelOne>
            <ThemeProvider>
              <ChildLevelTwo/>
            </ThemeProvider>
          </ChildLevelOne>
        </App>
      </div>
    </div>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
