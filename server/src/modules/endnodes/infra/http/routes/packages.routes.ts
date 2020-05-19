import { Router } from 'express';

import PackageController from '../controllers/PackageController';

const packagesRoutes = Router();

packagesRoutes
  .route('/:nodeID')
  .get(PackageController.index)
  .post(PackageController.store);

export default packagesRoutes;
