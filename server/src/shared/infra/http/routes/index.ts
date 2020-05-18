import { Router } from 'express';

import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';

import gatewaysRoutes from '@modules/gateways/infra/http/routes/gateways.routes';

import endnodesRoutes from './endnodes.routes';

import packagesRoutes from './packages.routes';
import sensorsRoutes from './sensors.routes';

const routes = Router();

routes.get('/', (_, res) =>
  res.json({
    message: `Welcome to Owlify API on ${process.env.NODE_ENV} mode`,
  }),
);

routes.use('/sessions', sessionsRoutes);

routes.use('/users', usersRoutes);

routes.use('/sensors', sensorsRoutes);

routes.use('/packages', packagesRoutes);

routes.use('/gateways', gatewaysRoutes);

routes.use('/endnodes', endnodesRoutes);

export default routes;
