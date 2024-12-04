const ProjectsRepository = require('../../Repositories/ProjectsRepository');

function FindProject(id) {
  const project = ProjectsRepository.findById(id);

  return project;
}

module.exports = FindProject;