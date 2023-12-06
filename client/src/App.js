import React from 'react';
import Login from './login'; // Adjust the path if necessary
import Registration from './registration'; // Adjust the path if necessary
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Welcome to MarketMateFX</h1>
      <Login />
      <Registration />
    </div>
  );
}

export default App;
