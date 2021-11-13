const { Pool } = require("pg");
const constring = "postgres://postgres:sanidhya@localhost:5432/eco";
const pool = new Pool({
  connectionString: constring,
});
pool.connect();

module.exports = pool;
