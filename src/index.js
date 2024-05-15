import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ExampleComponent from './ExampleComponent'; // Import the correct component

ReactDOM.render(
  <React.StrictMode>
    <ExampleComponent />
  </React.StrictMode>,
  document.getElementById('root')
);