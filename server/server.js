const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const authRoutes = require('./routes/authRoutes');

// Middlewares
app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

// Serve static files from the React app
app.use(express.static('../client/build'));

// Routes
app.get('/api', (req, res) => {
  res.json({ message: 'Welcome to the MarketMateFX API!' });
});

app.use('/api/auth', authRoutes);

// Add more API routes as needed

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
