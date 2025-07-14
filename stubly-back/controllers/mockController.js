const Mock = require('../models/mock');
const db = require('../config/db');
// Crear un nuevo mock
const createMock = async (req, res) => {
  const token = req.headers['x-session-token'];
  if (!token) return res.status(403).json({ error: 'Token is required' });

  req.body.path = normalizePath(req.body.path);

  var { path, method, response, name } = req.body;
  console.error('Body:', req.body);
  path = token + path;
  var createdBy = token;

  try {
    const result = await db.query(
      'INSERT INTO mocks (path, method, response, name, created_by) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [path, method, response, name, createdBy]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error('Error al insertar mock:', err);
    res.status(500).json({ error: 'Internal Error' });
  }
};

// Listar todos los mocks
const listMocks = async (_req, res) => {
  try {
    const result = await db.query('SELECT * FROM mocks ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error al consultar mocks:', err);
    res.status(500).json({ error: 'Internal Error' });
  }
};

// Editar un mock
const updateMock = async (req, res) => {
  const { id } = req.params;
  const { path, response, name } = req.body;
  try {
    const result = await db.query(
      `UPDATE mocks
       SET path = $1, response = $2, name= $3
       WHERE id = $4
       RETURNING *`,
      [path, response, name, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Mock not found' });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error al actualizar:', err);
    res.status(500).json({ error: 'Internal Error' });
  }

};

// Eliminar un mock
const deleteMock = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await db.query(
      'DELETE FROM mocks WHERE id = $1 RETURNING *',
      [id, token]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Mock not found' });
    }

    res.json({ success: true, deleted: result.rows[0] });
  } catch (err) {
    console.error('Error al eliminar:', err);
    res.status(500).json({ error: 'Internal Error' });
  }
};

// Listar todos los mocks por token
const listMocksByToken = async (req, res) => {
  const token = req.params.token;

  try {
    const result = await db.query(
      'SELECT * FROM mocks WHERE created_by = $1 ORDER BY created_at DESC',
      [token]
    );
    res.json(result.rows);
  } catch (err) {
    console.error('Error al consultar mocks:', err);
    res.status(500).json({ error: 'Internal Error' });
  }
};

const normalizePath = (inputPath) => {
  return '/' + inputPath
    .replace(/\s+/g, '')     // elimina todos los espacios en blanco
    .replace(/\/+/g, '/')    // reemplaza múltiples barras por una sola
    .replace(/^\/+/, '');    // elimina barras iniciales antes de anteponer una
};

module.exports = {
  createMock,
  listMocks,
  updateMock,
  deleteMock,
  listMocksByToken
};
