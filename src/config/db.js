const psql = require("pg");
const { Pool } = psql;

const database = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgres://nwqnpoitrzemiq:388a83c291ef1f939a132a7b42102bcca6a33164a1feb53609701596d4a5c622@ec2-54-145-204-49.compute-1.amazonaws.com:5432/d55jqri3nobb2o",
  ssl: {
    rejectUnauthorized: false
  },
});

module.exports = database;
