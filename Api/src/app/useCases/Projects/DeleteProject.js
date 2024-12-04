const ProjectsRepository = require('../../Repositories/ProjectsRepository');

function DeleteProject(id) {
  const project = ProjectsRepository.delete(id);

  return project;
}

module.exports = DeleteProject;