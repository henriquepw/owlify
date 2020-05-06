import { Router } from 'express';

import endnodesRoutes from './endnodes.routes';
import gatewaysRoutes from './gateways.routes';

import packagesRoutes from './packages.routes';
import sensorsRoutes from './sensors.routes';

import sessionsRoutes from './sessions.routes';
import usersRoutes from './users.routes';

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
