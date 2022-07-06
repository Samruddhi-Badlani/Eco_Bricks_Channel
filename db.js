const { Pool } = require('pg')

const pool = new Pool({
  user: 'ecobricks',
  host: 'localhost',
  database: 'ecobricks',
  port: 5432,
  password: 'ecobricks',
})

module.exports = {
  query: (queryText, params, callback) => {
    return pool.query(queryText, params, callback)
  },
}
