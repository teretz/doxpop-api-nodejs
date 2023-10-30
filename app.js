const express = require('express');
const uploadRoute = require('./routes/upload');

const app = express();

app.use('/api/upload', uploadRoute);

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000/');
});