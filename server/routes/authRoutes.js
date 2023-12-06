const express = require('express');
const router = express.Router();
const admin = require('../config/firebaseAdmin'); // Firebase Admin SDK

// Endpoint to verify user token
router.post('/verifyToken', async (req, res) => {
  const { token } = req.body;

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    // Token is valid. You can now use the decoded token to grant access or retrieve user data
    res.json({ uid: decodedToken.uid });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

module.exports = router;
