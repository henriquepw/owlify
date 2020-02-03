import { Router } from 'express';

import SensorController from './app/controllers/SensorController';
import PackageController from './app/controllers/PackageController';

const routes = Router();

routes.get('/', (_, res) => res.json({ message: 'Welcome to Owlify' }));

routes
  .route('/sensors/:host')
  .get(SensorController.index)
  .post(SensorController.store);

routes
  .route('/packages/:host')
  .get(PackageController.index)
  .post(PackageController.store);

export default routes;
