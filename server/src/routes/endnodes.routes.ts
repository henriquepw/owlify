import { Router } from 'express';

import EndnodeController from '../app/controllers/EndnodeController';

const routes = Router();

routes.route('/').get(EndnodeController.index);

routes
  .route('/:gatewayId')
  .get(EndnodeController.show)
  .post(EndnodeController.store);

routes
  .route('/:id')
  .put(EndnodeController.update)
  .delete(EndnodeController.delete);

export default routes;
