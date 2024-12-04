const UsersRepository = require('../../Repositories/UsersRepository');

function CreateUser(body) {
  const user = UsersRepository.create(body);

  return user;
}

module.exports = CreateUser;