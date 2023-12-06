import React, { useState } from 'react';
import { auth } from './firebase'; // Update the path if necessary
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Registration = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async (event) => {
    event.preventDefault();
    setError(''); // Clear any existing errors

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      // Handle successful registration
      // Add any additional logic needed after successful registration here
    } catch (error) {
      setError(error.message); // Display error message
    }
  };

  return (
    <div>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Registration;
