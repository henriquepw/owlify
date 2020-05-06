import { Router } from 'express';

import SessionsController from '../../../../app/controllers/SessionsController';

const routes = Router();

routes.post('/', SessionsController.store);

export default routes;
