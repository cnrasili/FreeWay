const express = require('express');
const router = express.Router();
const stationService = require('../services/stationService');
const lineService = require('../services/lineService');
const { validateCreateStation, validateUpdateStation } = require('../validators/stationValidator');

// GET /api/stations/:id
router.get('/:id', (req, res) => {
  const station = stationService.getStationById(Number(req.params.id));
  if (!station) return res.status(404).json({ error: 'Station not found.' });
  res.status(200).json(station);
});

// POST /api/stations
router.post('/', (req, res) => {
  const errors = validateCreateStation(req.body);
  if (errors.length > 0) return res.status(400).json({ errors });

  // Verify the referenced line exists
  const line = lineService.getLineById(Number(req.body.line_id));
  if (!line) return res.status(404).json({ error: 'Line not found.' });

  const station = stationService.createStation(req.body);
  res.status(201).json(station);
});

// PUT /api/stations/:id
router.put('/:id', (req, res) => {
  const errors = validateUpdateStation(req.body);
  if (errors.length > 0) return res.status(400).json({ errors });

  // If line_id is being changed, verify the new line exists
  if (req.body.line_id !== undefined) {
    const line = lineService.getLineById(Number(req.body.line_id));
    if (!line) return res.status(404).json({ error: 'Line not found.' });
  }

  const station = stationService.updateStation(Number(req.params.id), req.body);
  if (!station) return res.status(404).json({ error: 'Station not found.' });
  res.status(200).json(station);
});

// DELETE /api/stations/:id
router.delete('/:id', (req, res) => {
  const result = stationService.deleteStation(Number(req.params.id));
  if (!result) return res.status(404).json({ error: 'Station not found.' });
  res.status(200).json({ message: 'Station deleted.' });
});

module.exports = router;
