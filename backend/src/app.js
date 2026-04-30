const express = require('express');
const path = require('path');

const linesRouter = require('./routes/lines');
const stationsRouter = require('./routes/stations');

const app = express();

// Parse incoming JSON requests
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../../frontend')));

// API routes
app.use('/api/lines', linesRouter);
app.use('/api/stations', stationsRouter);

// Nested route: GET /api/lines/:lineId/stations
app.use('/api', stationsRouter);

module.exports = app;
