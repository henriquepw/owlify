import { Router } from 'express';

import SensorController from './app/controllers/SensorController';
import PackageController from './app/controllers/PackageController';
import UserController from './app/controllers/UserController';

const routes = Router();

routes.get('/', (_, res) => res.json({ message: 'Welcome to Owlify' }));

routes
  .route('/users')
  .post(UserController.store)
  .delete(UserController.delete);

routes
  .route('/sensors/:nodeID')
  .get(SensorController.index)
  .post(SensorController.store);

routes
  .route('/packages/:nodeID')
  .get(PackageController.index)
  .post(PackageController.store);

export default routes;
