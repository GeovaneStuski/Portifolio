const db = require('../app/database');

const username = process.env.USER_NAME;
const userpassword = process.env.USER_PASSWORD;

async function createUser() {
  const usersList = await db('SELECT * FROM users');

  if(usersList.length < 1) {
    await db(`
      INSERT INTO users(username, password)
      VALUES($1, $2)
      `, [username, userpassword]);
  }

  return;
}

module.exports = createUser;