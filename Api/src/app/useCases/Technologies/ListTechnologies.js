const TechnologiesRepository = require('../../Repositories/TechnologiesRepository');

function ListTechnologies() {
  const technologies = TechnologiesRepository.listAll();

  return technologies;
}

module.exports = ListTechnologies;