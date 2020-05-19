import { Router } from 'express';

import SensorController from '../controllers/SensorController';

const sensorsRoutes = Router();

sensorsRoutes
  .route('/:nodeID')
  .get(SensorController.index)
  .post(SensorController.store);

export default sensorsRoutes;
