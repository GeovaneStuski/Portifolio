const TechnologiesRepository = require('../../Repositories/TechnologiesRepository');

function UpdateTechnology({id, name}) {
  const technology = TechnologiesRepository.update({id, name});

  return technology;
}

module.exports = UpdateTechnology;