import { Router } from 'express';

import EndnodeController from '../controllers/EndnodeController';

const endnodesRoutes = Router();

endnodesRoutes.route('/').get(EndnodeController.index);

endnodesRoutes
  .route('/:gatewayId')
  .get(EndnodeController.show)
  .post(EndnodeController.store);

endnodesRoutes
  .route('/:id')
  .put(EndnodeController.update)
  .delete(EndnodeController.delete);

export default endnodesRoutes;
