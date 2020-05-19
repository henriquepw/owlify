import { Router } from 'express';

import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

import EndnodeController from '../controllers/EndnodeController';

const endnodesRoutes = Router();

endnodesRoutes.use(ensureAuthenticated);

endnodesRoutes
  .route('/')
  .get(EndnodeController.index)
  .post(EndnodeController.store);

endnodesRoutes
  .route('/:endnodeId')
  // .get(EndnodeController.show)
  // .put(EndnodeController.update)
  .delete(EndnodeController.delete);

export default endnodesRoutes;
