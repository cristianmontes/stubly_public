const express = require('express');
const router = express.Router();
const Mock = require('../models/mock');
const db = require('../config/db');

router.get('/:routeId(*)', async (req, res) => {
  console.log("iniciando la peticion..... " + req.params.routeId);
  
  const routePath = req.params.routeId;
  const method = 'GET'; // For now, solo GET

  console.log("Buscando mock con path: ", routePath);

  try {
    const result = await db.query(
      'SELECT response FROM mocks WHERE path = $1 AND method = $2 LIMIT 1',
      [routePath, method]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Mock not found' });
    }

    const delay = parseInt(req.query.delay) || 0;
    const jsonResponse = result.rows[0].response;

    if (delay > 0) {
      setTimeout(() => {
        res.status(200).json(jsonResponse);
      }, delay);
    } else {
      res.status(200).json(jsonResponse);
    }

  } catch (err) {
    console.error('Error founding mock:', err);
    res.status(500).json({ error: 'Internal Error' });
  }

});

module.exports = router;
