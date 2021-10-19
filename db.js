const {Pool} = require("pg");
const pool = new Pool({
    host:"localhost",
    port:5432,
    user:"postgres",
    password:"root",
    database:"ecobricks"
})
pool.connect();

module.exports = pool;