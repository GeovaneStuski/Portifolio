const { Router } = require('express');
const multer = require('multer');
const UsersController = require('./app/controllers/UsersController');
const authMiddleware = require('./app/middlewares/authMiddleware');
const TechnologiesController = require('./app/controllers/TechnologiesController');
const ProjectsController = require('./app/controllers/ProjectsController');
const InformationsController = require('./app/controllers/InformationsController');

const routes = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  fileFilter(req, file, callback) {
    const allowedMimeTypes = ['image/jpeg', 'application/pdf'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Unsupported file type'), false);
    }
  },
});

routes.post('/login', UsersController.authentication);

routes.get('/technologies', TechnologiesController.index);
routes.get('/projects', ProjectsController.index);
routes.get('/informations', InformationsController.index);
routes.get('/downloads/cv', InformationsController.downloadCv);
routes.get('/informations/profile_image', InformationsController.getImageProfile);
routes.get('/projects/:projectId/image', ProjectsController.getProjectImage);

routes.use(authMiddleware);

routes.post('/technologies', TechnologiesController.store);
routes.put('/technologies/:id', TechnologiesController.update);
routes.delete('/technologies/:id', TechnologiesController.delete);

routes.post('/projects', upload.single('image'), ProjectsController.store);
routes.put('/projects/:id', upload.single('image'), ProjectsController.update);
routes.delete('/projects/:id', ProjectsController.delete);

routes.put('/informations', upload.fields([
  { name: 'profile_image', maxCount: 1 },
  { name: 'cv', maxCount: 1 }
]),InformationsController.update, (error, req, res, next) => {
  res.status(400).json(error.message);
  next();
});

routes.get('/me', UsersController.getinformations);

module.exports = routes;