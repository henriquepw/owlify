import { Router } from 'express';

import PackageController from '../../../../app/controllers/PackageController';

const routes = Router();

routes
  .route('/:nodeID')
  .get(PackageController.index)
  .post(PackageController.store);

export default routes;
