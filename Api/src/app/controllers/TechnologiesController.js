const ListTechnologies = require('../useCases/Technologies/ListTechnologies');
const CreateTechnology = require('../useCases/Technologies/CreateTechnology');
const FindTechnology = require('../useCases/Technologies/FindTechnology');
const UpdateTechlogy = require('../useCases/Technologies/UpdateTechnology');
const DeleteTechnology = require('../useCases/Technologies/DeleteTechnology');

class TechnologiesController {
  async index(req, res) {
    try {
      const technologies = await ListTechnologies();

      res.status(200).json(technologies);
    } catch {
      res.sendStatus(500);
    }
  }

  async store(req, res) {
    try {
      const { name } = req.body;

      if(!name) {
        return res.status(400).json('Missing name');
      }

      const technology = await CreateTechnology(name);

      res.status(200).json(technology);
    } catch {
      res.sendStatus(500);
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if(!id) {
        return res.status(400).json('Missing Id');
      }
      
      const { name } = req.body;

      if(!name) {
        return res.status(400).json('Missing name');
      }

      const technologyExists = await FindTechnology(id);

      if(!technologyExists) {
        return res.status(404).json('Technology not found');
      }

      const technology = await UpdateTechlogy({id, name});

      res.status(200).json(technology);
    } catch {
      res.sendStatus(500);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if(!id) {
        return res.status(400).json('Missing Id');
      }

      const technologyExists = await FindTechnology(id);

      if(!technologyExists) {
        return res.status(404).json('Technology not found');
      }

      await DeleteTechnology(id);

      res.sendStatus(204);
    } catch {
      res.sendStatus(500);
    }
  }
}

module.exports = new TechnologiesController();