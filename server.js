// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fetch = require('node-fetch');

// Start up an instance of app
const app = express();
const PORT = 8080;

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors())

// Initialize the main project folder
app.use(express.static('website'));


// GET Route to retrieve projectData
app.get('/api/projectdata', (request, response) => {
  response.status(200).send(projectData);
});

app.post('/api/projectdata', (request, response) => {
  const {date, temp, content} = request.body;
  projectData[date] = {
    temp,
    content,
  };
  response.status(201).send();
});

// Setup Server
app.listen(PORT, () => {
  console.log(`Running server on ${PORT}`)
});






