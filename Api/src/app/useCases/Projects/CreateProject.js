const ProjectsRepository = require('../../Repositories/ProjectsRepository');

function CreateProject(body) {
  const project = ProjectsRepository.create(body);
  
  return project;
}

module.exports = CreateProject;