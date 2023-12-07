import React, { useState } from 'react';


import { auth } from './firebase'; 



const TradeInput = ({ onAddTrade }) => {
  const [tradePair, setTradePair] = useState('');
  const [outcome, setOutcome] = useState('');
  const [tradeDate, setTradeDate] = useState('');


  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = auth.currentUser; // Get the currently logged-in user
  
    if (user) {
      onAddTrade({ 
        userId: user.uid, 
        tradePair, 
        outcome, 
        date: tradeDate // Include the trade date
      }); // Pass the trade data to App.js
    } else {
      console.error("No user logged in");
    }
  
    setTradePair('');
    setOutcome('');
    setTradeDate(''); // Reset the date as well
  };

  

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={tradePair}
        onChange={(e) => setTradePair(e.target.value)}
        placeholder="Trade Pair"
        required
      />
      <select value={outcome} onChange={(e) => setOutcome(e.target.value)} required>
        <option value="">Select Outcome</option>
        <option value="win">Win</option>
        <option value="loss">Loss</option>
      </select>
      <input
      type="date"
      value={tradeDate}
      onChange={(e) => setTradeDate(e.target.value)}
      required
    />
      <button type="submit">Add Trade</button>
    </form>
  );
};

export default TradeInput;
