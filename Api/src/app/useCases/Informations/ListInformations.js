const InformationsRepository = require('../../Repositories/InformationsRepository');

function ListInformations() {
  const informations = InformationsRepository.list();

  return informations;
}

module.exports = ListInformations;