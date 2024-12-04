const ProjectsRepository = require('../../Repositories/ProjectsRepository');

function ListProjects() {
  const projects = ProjectsRepository.listAll();
  
  return projects;
}

module.exports = ListProjects;