const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'schema.sql');
const sql = fs.readFileSync(filePath, 'utf-8');

const dbConfig = {
  port: Number(process.env.DB_PORT),
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
};

const isInDevelopmentEnviroment = process.env.MODE === 'development';

const client = new Client(isInDevelopmentEnviroment ? dbConfig : {...dbConfig, ssl: {
  rejectUnauthorized: false
}});

const initializeDatabase = async () => {
  try {
    await client.connect();
    await client.query(sql);
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

const queryDatabase = async (query, values) => {
  try {
    if (client._ending) {
      throw new Error('Client is closed. Cannot execute query.');
    }

    const result = await client.query(query, values);

    return result.rows;
  } catch (error) {
    console.error('Error executing query:', error);
    throw error;
  }
};

initializeDatabase().catch((err) => {
  console.error('Database initialization failed:', err);
  process.exit(1);
});

module.exports = {...client, query: queryDatabase};
