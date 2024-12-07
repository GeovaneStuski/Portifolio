const db = require('../src/app/database');

const username = process.env.USER_NAME;
const password = process.env.USER_PASSWORD;

async function createUser() {
  try {
    await db.query('INSERT INTO users(username, password) VALUES($1, $2)', [username, password]);
    console.log('User create with success!');
  } catch {
    console.error('Error to create user');
  } finally {
    if(db.end) {
      db.end();
    }
    process.exit(0);
  }
}

createUser();