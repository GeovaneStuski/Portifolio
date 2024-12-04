const db = require('../database');

class UsersRepository {
  async findUserByName(username) {
    const [row] = await db('SELECT * FROM users WHERE username = $1', [
      username,
    ]);

    return row;
  }

  async create({ username, password }) {
    const [row] = await db(`
      INSERT INTO users(username, password)
      VALUES($1, $2)
      RETURNING *
      `,
    [username, password]
    );

    return row;
  }
}

module.exports = new UsersRepository();
