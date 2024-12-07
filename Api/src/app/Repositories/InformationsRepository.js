const db = require('../database');

class InformationsRepository {
  async list() {
    const [informations] = await db.query('SELECT * FROM personal_information');

    return informations;
  }

  async update(body) {
    const type = Object.keys(body)[0];
    const value = body[type];

    const [information] = await db.query(`
      UPDATE personal_information 
      SET ${type} = $1
      RETURNING *
      `, [value]);

    return information;
  }
} 

module.exports = new InformationsRepository();