const express = require('express');
const path = require('path');

const app = express();

// Parse incoming JSON requests
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../../frontend')));

module.exports = app;
