import { Router } from 'express';

import PackagesController from '../controllers/PackagesController';

const packagesRoutes = Router();

packagesRoutes
  .route('/:endnodeId')
  .get(PackagesController.index)
  .post(PackagesController.store);

export default packagesRoutes;
