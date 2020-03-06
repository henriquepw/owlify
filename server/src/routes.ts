import { Router } from 'express';

import SensorController from './app/controllers/SensorController';
import PackageController from './app/controllers/PackageController';

import UserController from './app/controllers/UserController';
import GatewayController from './app/controllers/GatewayController';
import SessionController from './app/controllers/SessionController';
import EndnodeController from './app/controllers/EndnodeController';

import authMiddleware from './app/middlewares/auth';

const routes = Router();

routes.get('/', (_, res) => res.json({ message: 'Welcome to Owlify' }));

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes
  .route('/sensors/:nodeID')
  .get(SensorController.index)
  .post(SensorController.store);

routes
  .route('/packages/:nodeID')
  .get(PackageController.index)
  .post(PackageController.store);

routes.use(authMiddleware);

routes
  .route('/users')
  .post(UserController.store)
  .put(UserController.update)
  .delete(UserController.delete);

routes
  .route('/gateways/:id')
  .put(GatewayController.update)
  .delete(GatewayController.delete);

routes
  .route('/gateways')
  .get(GatewayController.index)
  .post(GatewayController.store);

routes.route('/endnodes').get(EndnodeController.index);

routes
  .route('/endnodes/:gatewayId')
  .get(EndnodeController.show)
  .post(EndnodeController.store);

routes
  .route('/endnodes/:id')
  .put(EndnodeController.update)
  .delete(EndnodeController.delete);

export default routes;
