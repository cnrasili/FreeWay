CREATE TABLE IF NOT EXISTS lines (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  name        TEXT    NOT NULL,
  type        TEXT    NOT NULL CHECK(type IN ('metro', 'tram', 'metrobus', 'marmaray', 'funicular', 'cablecar')),
  color       TEXT    NOT NULL DEFAULT '#000000',
  description TEXT,
  is_active   INTEGER NOT NULL DEFAULT 1 CHECK(is_active IN (0, 1)),
  created_at  TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at  TEXT    NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS stations (
  id           INTEGER PRIMARY KEY AUTOINCREMENT,
  name         TEXT    NOT NULL,
  line_id      INTEGER NOT NULL REFERENCES lines(id) ON DELETE CASCADE,
  order_number INTEGER NOT NULL,
  district     TEXT,
  created_at   TEXT    NOT NULL DEFAULT (datetime('now')),
  updated_at   TEXT    NOT NULL DEFAULT (datetime('now'))
);
