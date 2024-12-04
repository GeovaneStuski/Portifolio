const ProjectsRepository = require('../../Repositories/ProjectsRepository');

function UpdateProject(body) {
  const project = ProjectsRepository.update(body);
  
  return project;
}

module.exports = UpdateProject;