const db = require('../db/database');

// Returns all stations, optionally filtered by name search query
function getAllStations(query = '') {
  let sql = 'SELECT * FROM stations';
  const params = [];

  if (query) {
    sql += ' WHERE name LIKE ?';
    params.push(`%${query}%`);
  }

  sql += ' ORDER BY line_id ASC, order_number ASC';
  return db.prepare(sql).all(params);
}

// Returns all stations for a given line, ordered by order_number
function getStationsByLine(lineId) {
  const stmt = db.prepare(
    'SELECT * FROM stations WHERE line_id = ? ORDER BY order_number ASC'
  );
  return stmt.all(lineId);
}

// Returns a single station by id
function getStationById(id) {
  const stmt = db.prepare('SELECT * FROM stations WHERE id = ?');
  return stmt.get(id) || null;
}

// Creates a new station under the given line
function createStation(data) {
  const stmt = db.prepare(`
    INSERT INTO stations (name, line_id, order_number, district)
    VALUES (@name, @line_id, @order_number, @district)
  `);

  const payload = {
    name:         data.name,
    line_id:      data.line_id,
    order_number: data.order_number,
    district:     data.district || null,
  };

  const info = stmt.run(payload);

  // Return the newly created record
  const getStmt = db.prepare('SELECT * FROM stations WHERE id = ?');
  return getStmt.get(info.lastInsertRowid);
}

// Updates a station by id, returns the updated record or null if not found
function updateStation(id, data) {
  const existing = getStationById(id);
  if (!existing) return null;

  const stmt = db.prepare(`
    UPDATE stations
    SET name         = @name,
        line_id      = @line_id,
        order_number = @order_number,
        district     = @district,
        updated_at   = datetime('now')
    WHERE id = @id
  `);

  stmt.run({
    id,
    name:         data.name         !== undefined ? data.name         : existing.name,
    line_id:      data.line_id      !== undefined ? data.line_id      : existing.line_id,
    order_number: data.order_number !== undefined ? data.order_number : existing.order_number,
    district:     data.district     !== undefined ? data.district     : existing.district,
  });

  return getStationById(id);
}

// Deletes a station by id, returns true or null if not found
function deleteStation(id) {
  const existing = getStationById(id);
  if (!existing) return null;

  const stmt = db.prepare('DELETE FROM stations WHERE id = ?');
  stmt.run(id);
  return true;
}

module.exports = {
  getAllStations,
  getStationsByLine,
  getStationById,
  createStation,
  updateStation,
  deleteStation,
};
