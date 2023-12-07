import { auth, db } from './firebase';
import React, { useState } from 'react';
import Login from './login';
import Registration from './registration';
import Home from './Home';
import TradeInput from './TradeInput';
import { collection, query, where, getDocs } from 'firebase/firestore';


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [trades, setTrades] = useState([]);
  const [showTradeInput, setShowTradeInput] = useState(false);
  const [showTradeHistory, setShowTradeHistory] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const addTrade = (trade) => {
    setTrades([...trades, trade]);
    setShowTradeInput(false); // Hide trade input form after adding a trade
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
  
  const fetchTrades = async (userId) => {
    const q = query(collection(db, "trades"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    const fetchedTrades = [];
    querySnapshot.forEach((doc) => {
      fetchedTrades.push(doc.data());
    });
    setTrades(fetchedTrades);
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
              {trades.map((trade, index) => (
                <p key={index}>{`${trade.tradePair}: ${trade.outcome}`}</p>
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
