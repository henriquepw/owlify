import { Router } from 'express';

import UserController from '../app/controllers/UserController';

import authMiddleware from '../app/middlewares/auth';

const routes = Router();

routes.post('/', UserController.store);

routes.use('/', authMiddleware);

routes
  .route('/')
  .put(UserController.update)
  .delete(UserController.delete);

export default routes;
