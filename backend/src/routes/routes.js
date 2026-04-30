const express = require('express');
const router = express.Router();
const routeService = require('../services/routeService');

// GET /api/routes?from=StationA&to=StationB
router.get('/', (req, res) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).json({ error: 'Query parameters "from" and "to" are required.' });
  }

  const result = routeService.findRoute(from.trim(), to.trim());

  if (!result.found) {
    return res.status(404).json({ error: result.reason });
  }

  res.status(200).json(result);
});

module.exports = router;
