import { Router } from 'express';

import SensorController from './app/controllers/SensorController';

const routes = new Router();

routes.get('/', (_, res) => res.json({ message: 'Welcome to Pandora' }));

routes
  .route('/sensors/:host')
  .get(SensorController.index)
  .post(SensorController.store);

export default routes;
