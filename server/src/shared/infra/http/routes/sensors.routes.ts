import { Router } from 'express';

import SensorController from '../../../../app/controllers/SensorController';

const routes = Router();

routes
  .route('/:nodeID')
  .get(SensorController.index)
  .post(SensorController.store);

export default routes;
