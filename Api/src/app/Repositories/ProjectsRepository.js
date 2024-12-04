const db = require('../database');

class ProjectsRepository {
  async listAll() {
    const rows = await db(`
      SELECT p.*, json_agg(json_build_object('id', t.id, 'name', t.name)) AS technologies
      FROM projects p 
      JOIN project_technologies pt ON p.id = pt.project_id 
      JOIN technologies t ON t.id = pt.technology_id 
      GROUP BY p.id
      `);

    return rows;
  }

  async findById(id) {
    const [row] = await db('SELECT * FROM projects WHERE id = $1', [id]);

    return row;
  }

  async create({ title, imagepath, description, repositorylink, technologies }) {
    const [project] = await db(`
      INSERT INTO projects(title, imagepath, description, repositorylink)
      VALUES($1, $2, $3, $4)
      RETURNING *
      `,
    [title, imagepath, description, repositorylink]
    );

    await Promise.all(technologies.map((technology) => {
      return db(`
        INSERT INTO project_technologies(project_id, technology_id)
        VALUES($1, $2)
      `, [project.id, technology]);
    }));

    const technologiesList = await db(`
      SELECT t.name, t.id 
      FROM project_technologies pt
      JOIN technologies t on t.id = pt.technology_id
      WHERE pt.project_id = $1
     `, [project.id]);

    return {...project, technologies: technologiesList};
  }

  async update({ id, title, imagepath, description, repositorylink, technologies }) {
    const [project] = await db(`
        UPDATE projects 
        SET title = $1, imagepath = $2, description = $3, repositorylink = $4
        WHERE id = $5
        RETURNING *
      `,
    [title, imagepath, description, repositorylink, id]
    );

    const existingTechIds = (await db('SELECT * FROM project_technologies WHERE project_id = $1', [id])).map(technology => technology.technology_id);

    const promisses = [];

    existingTechIds.forEach(techId => {
      if(!technologies.includes(techId)) {
        promisses.push(db('DELETE FROM project_technologies WHERE technology_id = $1', [techId]));
      }
    });

    technologies.forEach(techId => {
      if(!existingTechIds.includes(techId)) {
        promisses.push(db(`
          INSERT INTO project_technologies(project_id, technology_id)
          VALUES($1, $2)
        `, [id, techId]));
      }
    });

    await Promise.all(promisses);

    const changedProjectTechnologies = await db(`
       SELECT t.name, t.id 
       FROM project_technologies pt
       JOIN technologies t on t.id = pt.technology_id
       WHERE pt.project_id = $1
      `, [id]);

    return {...project, technologies: changedProjectTechnologies};
  }

  async delete(id) {
    const row = await db('DELETE FROM projects WHERE id = $1', [id]);

    return row;
  }
}

module.exports = new ProjectsRepository();