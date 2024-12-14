const CreateProject = require('../useCases/Projects/CreateProject');
const DeleteProject = require('../useCases/Projects/DeleteProject');
const FindProject = require('../useCases/Projects/FindProject');
const ListProjects = require('../useCases/Projects/ListProjects');
const UpdateProject = require('../useCases/Projects/UpdateProject');
const S3Client = require('../../utils/S3Client');
const { PutObjectCommand, DeleteObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');

class ProjectsController {
  async index(req, res) {
    try {
      const projects = await ListProjects();

      res.status(200).json(projects);
    } catch(error) {
      console.error('Error to list projects: ' + error);
      res.sendStatus(500);
    }
  }

  async getProjectImage(req, res) {
    try {
      const { projectId } = req.params;

      
      const project = await FindProject(projectId);
      
      if(!project) {
        return res.status(404).json('Project not found');
      }

      const command = new GetObjectCommand({
        Bucket: 'myportifolio',
        Key: project.imagepath
      });

      const response = await S3Client.send(command);

      const chunks = [];

      for await (const chunk of response.Body) {
        chunks.push(chunk);
      }

      const imageBuffer = Buffer.concat(chunks);

      res.set('Content-Type', response.ContentType || 'image/jpeg');
      
      res.send(imageBuffer);
    } catch(error) {
      console.log('Error to get project image: ' + error);
      res.sendStatus(500);
    }
  }

  async store(req, res) {
    try {
      const file = req.file;

      if(!file) {
        return res.status(400).json('Image is require');
      }

      const { title, description, repositorylink, technologies } = req.body;

      const imagepath = `${Date.now()}-${file.originalname}`;

      if(!title || !description || !repositorylink || technologies.length < 1 || !technologies) {
        return res.status(400).json('Missing data');
      }

      const command = new PutObjectCommand({
        Bucket: 'myportifolio',
        Key: imagepath,
        Body: file.buffer,
      });

      await S3Client.send(command);

      const project = await CreateProject({
        title,
        description,
        repositorylink,
        technologies: JSON.parse(technologies),
        imagepath
      });

      res.status(201).json(project);
    } catch(error) {
      console.error('Error to create project: ' + error);
      res.sendStatus(500);
    }
  }

  async update(req, res) {
    try {
      let imageFile = req.file;

      const { id } = req.params;
      
      const { image, title, description, repositorylink, technologies } = req.body;

      console.log({ image, file: req.file, files: req.files});

      if(!imageFile && !image) {
        return res.status(400).json('Missing Image');
      }

      if(!id) {
        return res.status(400).json('Missing Id');
      }

      if(!title || !description || !repositorylink || !technologies || technologies.length < 1) {
        return res.status(400).json('Missing data');
      }

      const projectExists = await FindProject(id);

      if(!projectExists) {
        return res.status(404).json('Project not found');
      }

      let imagePath = imageFile ? `${Date.now()}-${imageFile.originalname}` : image;

      if(imageFile && !image) {
        const deleteCommand = new DeleteObjectCommand({
          Bucket: 'myportifolio',
          Key: projectExists.imagepath,
        });

        const putCommand = new PutObjectCommand({
          Bucket: 'myportifolio',
          Key: imagePath,
          Body: imageFile.buffer
        });

        await S3Client.send(deleteCommand);
        await S3Client.send(putCommand);
      }

      const project = await UpdateProject({ id,
        title,
        description,
        repositorylink,
        technologies: JSON.parse(technologies), 
        imagepath: imagePath 
      });

      res.status(200).json(project);
    } catch(error) {
      console.error('Error to update project: ' + error);
      res.sendStatus(500);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if(!id) {
        return res.status(400).json('Missing Id');
      }

      const projectExists = await FindProject(id);

      if(!projectExists) {
        return res.status(404).json('Project not found');
      }

      await DeleteProject(id);

      const command = new DeleteObjectCommand({
        Bucket: 'myportifolio',
        Key: projectExists.imagepath,
      });

      await S3Client.send(command);

      res.sendStatus(204);
    } catch(error) {
      console.error('Error to delete project: ' + error);
      res.sendStatus(500);
    }
  }
}

module.exports = new ProjectsController();