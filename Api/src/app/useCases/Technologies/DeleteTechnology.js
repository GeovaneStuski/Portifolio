const TechnologiesRepository = require('../../Repositories/TechnologiesRepository');

function DeleteTechnology(id) {
  const technology = TechnologiesRepository.delete(id);
  
  return technology;
}

module.exports = DeleteTechnology;