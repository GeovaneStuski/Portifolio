const jwt = require('jsonwebtoken');
const FindUserByName = require('../useCases/Users/FindUserByName');
const CreateUser = require('../useCases/Users/CreateUser');
const passwordToRegisterUser = process.env.REGISTER_PASSWORD;
const secretKey = process.env.SECRET_KEY;

class UsersController {
  getinformations(req, res) {
    res.status(200).json(req.user);
  }

  async authentication(req, res) {
    try {
      const { username, password } = req.body;

      const userExists = await FindUserByName(username);
  
      if(!userExists) {
        return res.status(404).json('User not found');
      } 
  
      if(userExists.password === password) {
        const payload = {
          username,
          password,
        };
  
        const token = jwt.sign(payload, secretKey, { expiresIn: '1d' });
  
        res.status(200).json({
          payload,
          token,
        });
      } else {
        res.status(401).json('Wrong password');
      }
    } catch {
      res.sendStatus(500);
    }
  }
  
  async store(req, res) {
    try {
      const { username, password, registerPassword } = req.body;

      if(!username || !password) {
        return res.status(400).json('Missing data');
      }

      if(registerPassword === passwordToRegisterUser) {
        if(!username || !password) {
          return res.status(400).json('Missing data');
        }

        const userExists = await FindUserByName(username);

        if(userExists) {
          return res.status(409).json('Username already in use');
        }
  
        const user = await CreateUser({username, password});
  
        res.status(201).json(user);
      } else {
        res.status(401).json('Wrong register password');
      }
    } catch {
      res.sendStatus(500);
    }
  }
}

module.exports = new UsersController();