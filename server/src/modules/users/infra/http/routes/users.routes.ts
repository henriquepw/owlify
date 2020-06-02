import { Router } from 'express';

import UsersController from '../controllers/UsersController';
import authMiddleware from '../middlewares/ensureAuthenticated';

const routes = Router();

routes.post('/', UsersController.store);

routes.use('/', authMiddleware);

routes.get('/profile', UsersController.show);

routes.post('/', UsersController.store);

routes.put('/', UsersController.update);

routes.delete('/', UsersController.delete);

export default routes;
