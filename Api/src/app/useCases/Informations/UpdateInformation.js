const InformationsRepository = require('../../Repositories/InformationsRepository');

function UpdateInformation(body) {
  const information = InformationsRepository.update(body);

  return information;
}

module.exports = UpdateInformation;