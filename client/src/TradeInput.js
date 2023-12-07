import React, { useState } from 'react';
import { db } from './firebase';
import { collection, addDoc } from 'firebase/firestore';
import { auth } from './firebase'; 



const TradeInput = ({ onAddTrade }) => {
  const [tradePair, setTradePair] = useState('');
  const [outcome, setOutcome] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const user = auth.currentUser; // Get the currently logged-in user
  
    if (user) {
      try {
        await addDoc(collection(db, "trades"), {
          userId: user.uid, // Use the user's unique ID
          tradePair,
          outcome
        });
        onAddTrade({ tradePair, outcome }); // Optionally update local state
      } catch (error) {
        console.error("Error adding document: ", error);
      }
    } else {
      console.error("No user logged in");
    }
  
    setTradePair('');
    setOutcome('');
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
      <button type="submit">Add Trade</button>
    </form>
  );
};

export default TradeInput;
