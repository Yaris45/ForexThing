import React, { useState } from 'react';
import Login from './login';
import Registration from './registration';
import Home from './Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="App">
      {isLoggedIn ? (
        <Home />
      ) : (
        <>
          <Login onLoginSuccess={() => setIsLoggedIn(true)} />
          <Registration />
        </>
      )}
    </div>
  );
}

export default App;
