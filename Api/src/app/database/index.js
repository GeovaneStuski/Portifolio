const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'schema.sql');

const sql = fs.readFileSync(filePath, 'utf-8');

const client = new Client({
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  }
});

(async () => {
  try {
    await client.connect();
    await client.query(sql);
  } catch {
    await client.end();
  }
})();

module.exports = async (query, values) => {
  const row = await client.query(query, values);

  return row.rows;
};