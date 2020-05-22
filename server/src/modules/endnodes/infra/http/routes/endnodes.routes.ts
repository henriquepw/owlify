import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import EndnodesController from '../controllers/EndnodesController';
import GatewayEndnodesController from '../controllers/GatewayEndnodesController';

const endnodesRoutes = Router();

endnodesRoutes.use(ensureAuthenticated);

endnodesRoutes.get('/gateway/:gatewayId', GatewayEndnodesController.index);

endnodesRoutes
  .route('/')
  .get(EndnodesController.index)
  .post(EndnodesController.store);

endnodesRoutes
  .route('/:endnodeId')
  // .get(EndnodesController.show)
  // .put(EndnodesController.update)
  .delete(EndnodesController.delete);

export default endnodesRoutes;
