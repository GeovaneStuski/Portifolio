const ListInformations = require('../useCases/Informations/ListInformations');
const UpdateInformation = require('../useCases/Informations/UpdateInformation');
const { PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');

const S3Client = require('../../utils/S3Client');

class InformationsController {
  async index(req, res) {
    try {
      const informations = await ListInformations();

      res.status(200).json(informations);
    } catch(error) {
      console.error('Error to list informations: ' + error);
      res.sendStatus(500);
    }
  }

  async getImageProfile(req, res) {
    try {
      const command = new GetObjectCommand({
        Bucket: 'myportifolio',
        Key: 'Profile_Image.jpg'
      });

      let response;

      try {
        response = await S3Client.send(command);
      } catch {
        return res.status(404).json('Image not found');
      }

      res.setHeader('Content-Length', response.ContentLength);
      response.Body.pipe(res);
    } catch(error) {
      console.log('Error to get profile image: ' + error);
      res.sendStatus(500);
    }
  }

  async update(req, res) {
    try {
      if(!req.files && Object.keys(req.body).length < 1) {
        return res.status(400).json('Missing data');
      }

      if(req.files && Object.keys(req.files).length > 0) {
        const key = Object.keys(req.files)[0];

        const file = req.files[key][0];

        if(!file) {
          return res.status(400).json('Missing file');
        }

        const fileName = {
          'cv': 'Curriculo.pdf',
          'profile_image': 'Profile_Image.jpg',
          'image': `${Date.now()}-${file.originalname}`,
        };

        const command = new PutObjectCommand({
          Bucket: 'myportifolio',
          Key: fileName[key],
          Body: file.buffer,
        });

        await S3Client.send(command);
      
        if(key === 'cv') {
          return res.status(200).json('Cv Updated!');
        }

        if(key === 'profile_image') {
          return res.status(200).json('Profile picture Updated!');
        }
      }

      const information = await UpdateInformation(req.body);

      res.status(200).json(information);
    } catch(error) {
      console.error('Error to update information: ' + error);
      res.sendStatus(500);
    }
  }

  async downloadCv(req, res) {
    try {
      const command = new GetObjectCommand({
        Bucket: 'myportifolio',
        Key: 'Curriculo.pdf',
      });

      const cv = await S3Client.send(command);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename="Curriculo.pdf"');

      cv.Body.pipe(res);
    } catch(error) {
      console.log('Error to download CV: ' + error);
      res.sendStatus(500);
    }
  }
}

module.exports = new InformationsController();