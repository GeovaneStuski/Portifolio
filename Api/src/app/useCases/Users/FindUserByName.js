const UsersRepository = require('../../Repositories/UsersRepository');

function FindUserByName(username) {
  const user = UsersRepository.findUserByName(username);

  return user;
}

module.exports = FindUserByName;