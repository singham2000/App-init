// src/app.js
const express = require('express');
const bodyParser = require('body-parser');
const http = require('http');
const userRoutes = require('./src/routes/userRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const server = http.createServer(app);


app.use(bodyParser.json());

// Routes
app.use('/api', userRoutes);

app.get('/', (req, res) => {
  res.end('Hello, Express with IISNode!');
});

app.get('*', (req, res) => {
  throw new AppError(400, 'Invalid endpoint');
});

app.set('port', process.env.PORT);

app.listen(port, function (error) {

  if (error) {
    console.error('Error starting server:', error);
  } else {
    console.log(`Server is running on port ${port}`);
  }
});



