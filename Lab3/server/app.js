const express = require('express');
const cors = require('cors');
const path = require('path');
const imageRoutes = require('./routes/images');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));
app.use('/api', imageRoutes);

app.get('/', (req, res) => {
  res.send('Backend server running!');
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});