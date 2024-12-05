const { Client } = require('pg');

const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_NAME;
const user = process.env.DB_USER;
const password = process.env.DB_PASSWORD;

const client = new Client({
  port: Number(port),
  host,
  database,
  user,
  password,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect();

module.exports = async (query, values) => {
  const row = await client.query(query, values);

  return row.rows;
};