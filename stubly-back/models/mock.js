const mongoose = require('mongoose');
/*
const mockSchema = new mongoose.Schema({
  route: { type: String, required: true, unique: true },
  response: { type: Object, required: true }
}, { timestamps: true });
*/
const mockSchema = new mongoose.Schema({
  path: { type: String, required: true, unique: true },
  method: String,
  response: { type: Object, required: true },
  createdBy: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Mock', mockSchema);
