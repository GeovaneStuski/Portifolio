const path = require('path');
const ListInformations = require('../useCases/Informations/ListInformations');
const UpdateInformation = require('../useCases/Informations/UpdateInformation');

class InformationsController {
  async index(req, res) {
    try {
      const informations = await ListInformations();

      res.status(200).json(informations);
    } catch {
      res.sendStatus(500);
    }
  }

  async update(req, res) {
    try {
      if(req.files) {
        if(req.files['profile_image']) {
          return res.status(200).json('Profile image updated!');
        }

        if(req.files['cv']) {
          return res.status(200).json('Cv updated!');
        }
      }

      if(!req.files || Object.keys(req.body).length < 1) {
        return res.status(400).json('Missing data');
      }

      const information = await UpdateInformation(req.body);

      res.status(200).json(information);
    } catch {
      res.sendStatus(500);
    }
  }

  async downloadCv(req, res) {
    try {
      const cvPath = path.join(__dirname, '../../../uploads/Curriculo.pdf');

      res.download(cvPath, 'Curriculo.pdf', (err) => {
        if(err) {
          return res.sendStatus(500);
        }
      });
    } catch {
      res.sendStatus(500);
    }
  }
}

module.exports = new InformationsController();