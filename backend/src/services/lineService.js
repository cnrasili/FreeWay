const db = require('../db/database');

// Returns all lines, optionally filtered by type
function getAllLines(filters = {}) {
  let query = 'SELECT * FROM lines';
  let params = [];

  if (filters.type) {
    query += ' WHERE type = ?';
    params.push(filters.type);
  }

  query += ' ORDER BY id ASC';

  const stmt = db.prepare(query);
  return stmt.all(params);
}

// Creates a new transit line
function createLine(data) {
  const stmt = db.prepare(`
    INSERT INTO lines (name, type, color, description, is_active)
    VALUES (@name, @type, @color, @description, @is_active)
  `);

  const payload = {
    name: data.name,
    type: data.type,
    color: data.color || '#000000',
    description: data.description || null,
    is_active: data.is_active !== undefined ? data.is_active : 1,
  };

  const info = stmt.run(payload);
  
  // Return the newly created record
  const getStmt = db.prepare('SELECT * FROM lines WHERE id = ?');
  return getStmt.get(info.lastInsertRowid);
}

module.exports = {
  getAllLines,
  createLine,
};