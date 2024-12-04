const TechnologiesRepository = require('../../Repositories/TechnologiesRepository');

function CreateTechnology(name) {
  const technology = TechnologiesRepository.create(name);

  return technology;
}

module.exports = CreateTechnology;