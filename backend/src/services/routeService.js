const db = require('../db/database');

/**
 * Builds an adjacency list graph from all active lines in the database.
 *
 * Each node is a unique (stationName, lineId) pair represented as the key
 * "stationName|lineId". Edges connect:
 *   1. Adjacent stations on the same line (by order_number).
 *   2. Stations with the same name on different lines (transfer edges).
 *
 * Returns an object where each key maps to an array of neighbor descriptors:
 *   { node: string, type: 'ride' | 'transfer', lineId: number }
 */
function buildGraph() {
  // Fetch stations only from active lines, ordered for adjacency detection
  const rows = db.prepare(`
    SELECT s.id, s.name, s.line_id, s.order_number
    FROM stations s
    JOIN lines l ON l.id = s.line_id
    WHERE l.is_active = 1
    ORDER BY s.line_id ASC, s.order_number ASC
  `).all();

  const graph = {};

  // Helper: create a node key
  const key = (name, lineId) => `${name}|${lineId}`;

  // Ensure every station has an entry in the graph
  for (const row of rows) {
    const k = key(row.name, row.line_id);
    if (!graph[k]) graph[k] = [];
  }

  // 1. Ride edges — connect consecutive stations on the same line (bidirectional)
  for (let i = 0; i < rows.length; i++) {
    const curr = rows[i];
    const next = rows[i + 1];

    if (next && next.line_id === curr.line_id && next.order_number === curr.order_number + 1) {
      const kCurr = key(curr.name, curr.line_id);
      const kNext = key(next.name, next.line_id);

      graph[kCurr].push({ node: kNext, type: 'ride', lineId: curr.line_id });
      graph[kNext].push({ node: kCurr, type: 'ride', lineId: curr.line_id });
    }
  }

  // 2. Transfer edges — stations sharing the same name across different lines
  // Group nodes by station name
  const byName = {};
  for (const row of rows) {
    if (!byName[row.name]) byName[row.name] = [];
    byName[row.name].push({ node: key(row.name, row.line_id), lineId: row.line_id });
  }

  for (const name of Object.keys(byName)) {
    const nodes = byName[name];
    if (nodes.length < 2) continue;

    // Connect every pair (bidirectional transfer)
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        graph[nodes[i].node].push({ node: nodes[j].node, type: 'transfer', lineId: nodes[j].lineId });
        graph[nodes[j].node].push({ node: nodes[i].node, type: 'transfer', lineId: nodes[i].lineId });
      }
    }
  }

  return graph;
}

/**
 * Returns an array of station names that appear on more than one active line.
 * These are the natural transfer points of the network.
 */
function getTransferPoints() {
  const rows = db.prepare(`
    SELECT s.name, COUNT(DISTINCT s.line_id) AS line_count
    FROM stations s
    JOIN lines l ON l.id = s.line_id
    WHERE l.is_active = 1
    GROUP BY s.name
    HAVING line_count > 1
    ORDER BY s.name ASC
  `).all();

  return rows.map((r) => ({ name: r.name, lineCount: r.line_count }));
}

/**
 * Finds the route with the fewest transfers between two stations using BFS.
 *
 * @param {string} fromName - Departure station name (case-sensitive)
 * @param {string} toName   - Destination station name (case-sensitive)
 * @returns {object} result
 *   On success: { found: true, transfers: number, steps: Step[] }
 *   On failure: { found: false, reason: string }
 *
 * Each Step: { station: string, lineId: number, action: 'board' | 'ride' | 'transfer' | 'arrive' }
 */
function findRoute(fromName, toName) {
  if (fromName === toName) {
    return { found: false, reason: 'Departure and destination are the same station.' };
  }

  const graph = buildGraph();

  // Collect all nodes for the departure and destination station names
  const startNodes = Object.keys(graph).filter((k) => k.startsWith(`${fromName}|`));
  const goalNames  = new Set(
    Object.keys(graph).filter((k) => k.startsWith(`${toName}|`))
  );

  if (startNodes.length === 0) {
    return { found: false, reason: `Departure station "${fromName}" not found.` };
  }
  if (goalNames.size === 0) {
    return { found: false, reason: `Destination station "${toName}" not found.` };
  }

  // BFS state: { node, transferCount, path: [{node, type}] }
  const queue   = [];
  const visited = new Set();

  for (const start of startNodes) {
    queue.push({ node: start, transferCount: 0, path: [{ node: start, type: 'board' }] });
    visited.add(start);
  }

  while (queue.length > 0) {
    const { node, transferCount, path } = queue.shift();

    // Goal check
    if (goalNames.has(node)) {
      return {
        found:     true,
        transfers: transferCount,
        steps:     buildSteps(path),
      };
    }

    for (const edge of graph[node]) {
      if (visited.has(edge.node)) continue;
      visited.add(edge.node);

      const newTransfers = transferCount + (edge.type === 'transfer' ? 1 : 0);
      queue.push({
        node:          edge.node,
        transferCount: newTransfers,
        path:          [...path, { node: edge.node, type: edge.type }],
      });
    }
  }

  return { found: false, reason: 'No route found between the given stations.' };
}

/**
 * Converts the raw BFS path into human-readable steps.
 * @param {Array<{node: string, type: string}>} path
 * @returns {Array<{station: string, lineId: number, action: string}>}
 */
function buildSteps(path) {
  return path.map((item, index) => {
    const [station, lineIdStr] = item.node.split('|');
    const lineId = Number(lineIdStr);

    let action;
    if (index === 0)             action = 'board';
    else if (index === path.length - 1) action = 'arrive';
    else if (item.type === 'transfer')  action = 'transfer';
    else                                action = 'ride';

    return { station, lineId, action };
  });
}

module.exports = { buildGraph, getTransferPoints, findRoute };
