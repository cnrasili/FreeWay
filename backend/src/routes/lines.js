const express = require('express');
const router = express.Router();
const lineService = require('../services/lineService');
const { validateCreateLine, validateUpdateLine } = require('../validators/lineValidator');

// GET /api/lines
router.get('/', (req, res) => {
  const filters = {};
  if (req.query.type) filters.type = req.query.type;

  const lines = lineService.getAllLines(filters);
  res.status(200).json(lines);
});

// GET /api/lines/:id
router.get('/:id', (req, res) => {
  const line = lineService.getLineById(Number(req.params.id));
  if (!line) return res.status(404).json({ error: 'Line not found.' });
  res.status(200).json(line);
});

// POST /api/lines
router.post('/', (req, res) => {
  const errors = validateCreateLine(req.body);
  if (errors.length > 0) return res.status(400).json({ errors });

  const line = lineService.createLine(req.body);
  res.status(201).json(line);
});

// PUT /api/lines/:id
router.put('/:id', (req, res) => {
  const errors = validateUpdateLine(req.body);
  if (errors.length > 0) return res.status(400).json({ errors });

  const line = lineService.updateLine(Number(req.params.id), req.body);
  if (!line) return res.status(404).json({ error: 'Line not found.' });
  res.status(200).json(line);
});

// DELETE /api/lines/:id
router.delete('/:id', (req, res) => {
  const result = lineService.deleteLine(Number(req.params.id));
  if (!result) return res.status(404).json({ error: 'Line not found.' });
  res.status(200).json({ message: 'Line deleted.' });
});

module.exports = router;
