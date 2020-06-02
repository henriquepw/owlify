import { Router } from 'express';

import PacketsController from '../controllers/PacketsController';

const packetsRoutes = Router();

packetsRoutes
  .route('/:endnodeId')
  .get(PacketsController.index)
  .post(PacketsController.store);

export default packetsRoutes;
