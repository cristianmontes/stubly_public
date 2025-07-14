require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mockRoutes = require('./routes/mockRoutes');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const app = express();
app.use(express.json());
app.use(cors());
/*
const uri = "mongodb+srv://cmontes375:Am4nc1010.@cluster0.kpbxswc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
//mongoose.connect(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI, clientOptions)
//mongoose.connect(uri, clientOptions)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));
*/


const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minuto
  max: 10, // máximo 10 requests por minuto por IP
  message: 'Demasiadas peticiones desde esta IP. Intenta más tarde.'
});

app.use('/api/mocks',  limiter, mockRoutes);
app.use('/v1/mock', require('./routes/mockConsumer'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
