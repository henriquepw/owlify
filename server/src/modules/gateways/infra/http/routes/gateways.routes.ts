import { Router } from 'express';

import authMiddleware from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import GatewaysController from '../controllers/GatewaysController';

const routes = Router();

routes.use('/', authMiddleware);

routes.route('/').get(GatewaysController.index).post(GatewaysController.store);

routes
  .route('/:id')
  .put(GatewaysController.update)
  .delete(GatewaysController.delete);

export default routes;
