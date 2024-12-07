const jwt = require('jsonwebtoken');
const FindUserByName = require('../useCases/Users/FindUserByName');
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
    } catch(error) {
      console.error('Error to authenticate user: ' + error);
      res.sendStatus(500);
    }
  }
}

module.exports = new UsersController();