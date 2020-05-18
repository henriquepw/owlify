import { Router } from 'express';

import authMiddleware from '@modules/users/infra/http/middlewares/ensureAuthenticated';
import GatewayController from '../controllers/GatewayController';

const routes = Router();

routes.use('/', authMiddleware);

routes.route('/').get(GatewayController.index).post(GatewayController.store);

routes
  .route('/:id')
  .put(GatewayController.update)
  .delete(GatewayController.delete);

export default routes;
