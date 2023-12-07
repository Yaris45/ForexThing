import React from 'react';

const Home = ({ onAddTradeClick, onViewHistoryClick, onLogout }) => {
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={onAddTradeClick}>Add Trade</button>
      <button onClick={onViewHistoryClick}>Trade History</button>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
};

export default Home;
