const psql = require("pg")
const {
  Pool
} = psql

const {
  DB_USER,
  DB_HOST,
  YOUR_DB,
  DB_PASS,
  PORT
} = process.env


const db = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: YOUR_DB,
  password: DB_PASS,
  port: PORT,
})

module.exports = db