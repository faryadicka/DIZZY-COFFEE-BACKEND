const psql = require("pg")
const {
  Pool
} = psql


const databse = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
})

module.exports = databse