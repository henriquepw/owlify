import { Router } from 'express';

import GatewayController from '../app/controllers/GatewayController';

import authMiddleware from '../app/middlewares/auth';

const routes = Router();

routes.use('/', authMiddleware);

routes
  .route('/')
  .get(GatewayController.index)
  .post(GatewayController.store);

routes
  .route('/:id')
  .put(GatewayController.update)
  .delete(GatewayController.delete);

export default routes;
