const db = require('../database');

class UsersRepository {
  async findUserByName(username) {
    const [row] = await db('SELECT * FROM users WHERE username = $1', [
      username,
    ]);

    return row;
  }
}

module.exports = new UsersRepository();
