const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL, // o define manualmente host, user, password, db, port
});

module.exports = pool;
