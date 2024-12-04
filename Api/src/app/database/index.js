const { Client } = require('pg');

const host = process.env.HOST;
const port = process.env.DATABASE_PORT;
const database = process.env.DATABASE_NAME;
const user = process.env.DATABASE_USER;
const password = process.env.DATABASE_PASSWORD;

const client = new Client({
  port: Number(port),
  host,
  database,
  user,
  password,
});

client.connect();

module.exports = async (query, values) => {
  const row = await client.query(query, values);

  return row.rows;
};