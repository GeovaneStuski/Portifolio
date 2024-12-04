const TechnologiesRepository = require('../../Repositories/TechnologiesRepository');

function FindTechnology(id) {
  const technology = TechnologiesRepository.findById(id);

  return technology;
}

module.exports = FindTechnology;