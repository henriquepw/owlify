import { Router } from 'express';

import SensorsController from '../controllers/SensorsController';

const sensorsRoutes = Router();

sensorsRoutes
  .route('/:endnodeId')
  .get(SensorsController.index)
  .post(SensorsController.store);

export default sensorsRoutes;
