import { auth, db } from './firebase';
import React, { useState } from 'react';
import Login from './login';
import Registration from './registration';
import Home from './Home';
import TradeInput from './TradeInput';
import { collection, query, where, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';



function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [trades, setTrades] = useState([]);
  const [showTradeInput, setShowTradeInput] = useState(false);
  const [showTradeHistory, setShowTradeHistory] = useState(false);
  const [winPercentage, setWinPercentage] = useState('0.00');
  const [filterDate, setFilterDate] = useState('');



  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const addTrade = async (trade) => {
    const user = auth.currentUser; // Get the currently logged-in user
    if (user) {
      try {
        // Add the new trade to Firestore
        const docRef = await addDoc(collection(db, "trades"), {
          ...trade, // This includes tradePair, outcome, and date
          userId: user.uid // Attach the user's ID to the trade
        });
        console.log("Trade added successfully");
  
        // Update the local state with the new trade, including Firestore document ID
        const updatedTrades = [...trades, { ...trade, id: docRef.id }];
        setTrades(updatedTrades);
        setWinPercentage(calculateWinPercentage(updatedTrades));
        setShowTradeInput(false);
      } catch (error) {
        console.error("Error adding trade: ", error);
      }
    } else {
      console.error("No user logged in");
    }
  };
  
  

  const handleAddTradeClick = () => {
    setShowTradeInput(true);
    setShowTradeHistory(false);
  };

  const handleViewHistoryClick = async () => {
    const user = auth.currentUser; // Get the currently logged-in user
    if (user) {
      await fetchTrades(user.uid);
    } else {
      console.error("No user logged in");
    }
    setShowTradeHistory(true);
    setShowTradeInput(false);
  };
  
  const fetchTrades = async (userId, filterDate = '') => {
    let q = query(collection(db, "trades"), where("userId", "==", userId));
  
    if (filterDate) {
      // Assuming dates in Firestore are stored as 'YYYY-MM-DD' strings
      // or as JavaScript Date objects
      q = query(q, where("date", "==", filterDate));
    }
  
    const querySnapshot = await getDocs(q);
    const fetchedTrades = [];
    querySnapshot.forEach((doc) => {
      fetchedTrades.push({ id: doc.id, ...doc.data() });
    });
    setTrades(fetchedTrades);
    setWinPercentage(calculateWinPercentage(fetchedTrades));
  };
  
  
  

  const deleteTrade = async (tradeId) => {
    try {
      // Delete the trade from Firestore
      await deleteDoc(doc(db, "trades", tradeId));
  
      // Update the local state to remove the trade
      setTrades(trades.filter(trade => trade.id !== tradeId));
    } catch (error) {
      console.error("Error deleting trade: ", error);
    }
  };

  const calculateWinPercentage = (trades) => {
    const totalTrades = trades.length;
    const totalWins = trades.filter(trade => trade.outcome === 'win').length;
    return totalTrades > 0 ? (totalWins / totalTrades * 100).toFixed(2) : '0.00';
  };
  
  

  return (
    <div className="App">
      {isLoggedIn ? (
        <div>
          <Home
            onAddTradeClick={handleAddTradeClick}
            onViewHistoryClick={handleViewHistoryClick}
            onLogout={handleLogout}
          />
          {showTradeInput && <TradeInput onAddTrade={addTrade} />}
          {showTradeHistory && (
            <div>
              <h2>Trade History</h2>
              <input
                type="date"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}
              />
              <button onClick={() => fetchTrades(auth.currentUser.uid, filterDate)}>Filter</button>
              <p>Win Percentage: {winPercentage}%</p>
              {trades.map((trade) => (
                <div key={trade.id}>
                  <p>{`${trade.tradePair}: ${trade.outcome}`}</p>
                  <button onClick={() => deleteTrade(trade.id)}>Delete</button>
                </div>
              ))}
            </div>
          )}
        </div>
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
