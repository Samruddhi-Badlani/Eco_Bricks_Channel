const { Pool } = require("pg");
const constring = "postgres://postgres:root@localhost:5432/ecobricks";
const pool = new Pool({
  connectionString: constring,
});
pool.connect();

module.exports = pool;
