const express = require('express');
const path = require('path');

const linesRouter = require('./routes/lines');
const stationsRouter = require('./routes/stations');
const routesRouter = require('./routes/routes');
const routeService = require('./services/routeService');

const app = express();

// Parse incoming JSON requests
app.use(express.json());

// Serve frontend static files
app.use(express.static(path.join(__dirname, '../../frontend')));

// API routes
app.use('/api/lines', linesRouter);       // includes GET /:lineId/stations
app.use('/api/stations', stationsRouter);
app.use('/api/routes', routesRouter);

// GET /api/transfers
app.get('/api/transfers', (req, res) => {
  res.status(200).json(routeService.getTransferPoints());
});

module.exports = app;
