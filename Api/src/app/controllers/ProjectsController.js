const deleteImage = require('../../utils/deleteImage');
const CreateProject = require('../useCases/Projects/CreateProject');
const DeleteProject = require('../useCases/Projects/DeleteProject');
const FindProject = require('../useCases/Projects/FindProject');
const ListProjects = require('../useCases/Projects/ListProjects');
const UpdateProject = require('../useCases/Projects/UpdateProject');

class ProjectsController {
  async index(req, res) {
    try {
      const projects = await ListProjects();

      res.status(200).json(projects);
    } catch {
      res.sendStatus(500);
    }
  }

  async store(req, res) {
    try {
      const imagepath = req.file?.filename;

      const { title, description, repositorylink, technologies } = req.body;

      if(!imagepath, !title, !description, !repositorylink, !technologies) {
        return res.status(400).json('Missing data');
      }

      if(typeof technologies !== 'string') {
        return res.status(400).json('Wrong technologies type');
      }

      const project = await CreateProject({ title, description, repositorylink, imagepath, technologies: JSON.parse(technologies) });

      res.status(200).json(project);
    } catch(err){
      console.log(err);
      res.sendStatus(500);
    }
  }

  async update(req, res) {
    try {
      const imagepath = req.file?.filename;

      const { id } = req.params;
      
      const { image, title, description, repositorylink, technologies } = req.body;

      if(!imagepath && image) {
        return res.status(400).json('Missing Image');
      }

      if(!title, !description, !repositorylink, !technologies) {
        return res.status(400).json('Missing data');
      }

      const projectExists = await FindProject(id);

      if(!projectExists) {
        return res.status(404).json('Project not found');
      }

      const project = await UpdateProject({id, title, description, repositorylink, technologies: JSON.parse(technologies), imagepath: imagepath ? imagepath : image});

      if(imagepath) {
        deleteImage(projectExists.imagepath);
      }

      res.status(200).json(project);
    } catch(err) {
      console.log(err);
      res.sendStatus(500);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const projectExists = await FindProject(id);

      if(!projectExists) {
        return res.status(404).json('Project not found');
      }

      await DeleteProject(id);

      deleteImage(projectExists.imagepath);

      res.sendStatus(204);
    } catch {
      res.sendStatus(500);
    }
  }
}

module.exports = new ProjectsController();