const express = require('express');
const router = express.Router();
const {
  createMock,
  listMocks,
  updateMock,
  deleteMock,
  listMocksByToken
} = require('../controllers/mockController');

const { validarMockInput } = require('../util/utils');

router.post('/', validarMockInput, createMock);
router.get('/', listMocks);
router.put('/:id', updateMock);
router.delete('/:id', deleteMock);
router.get('/by-token/:token', listMocksByToken);

module.exports = router;
