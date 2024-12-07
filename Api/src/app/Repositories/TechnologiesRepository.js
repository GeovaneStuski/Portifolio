const db = require('../database');

class TechnologyRepostitory {
  async listAll() {
    const row = await db.query('SELECT * FROM technologies');

    return row;
  }

  async findById(id) {
    const row = await db.query('SELECT * FROM technologies WHERE id = $1', [id]);

    return row;
  }

  async create(name) {
    const [row] = await db.query(`
      INSERT INTO technologies(name)
      VALUES($1)
      RETURNING *
      `, [name]);
      
    return row;
  }

  async update({id, name}) {
    const [row] = await db.query(`
        UPDATE technologies 
        SET name = $1
        WHERE id = $2
        RETURNING *
      `, [name, id]);

    return row;
  }

  async delete(id) {
    const row = await db.query('DELETE FROM technologies WHERE id = $1', [id]);

    return row;
  }
}

module.exports = new TechnologyRepostitory();