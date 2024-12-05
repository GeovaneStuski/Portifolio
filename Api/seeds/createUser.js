const db = require('../src/app/database');

const username = process.env.USER_NAME;
const password = process.env.USER_PASSWORD;

async function createUser() {
  await db('INSERT INTO users(username, password) VALUES($1, $2)', [username, password]);
}

createUser();