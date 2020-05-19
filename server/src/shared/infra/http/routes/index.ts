import { Router } from 'express';

import usersRoutes from '@modules/users/infra/http/routes/users.routes';
import sessionsRoutes from '@modules/users/infra/http/routes/sessions.routes';

import gatewaysRoutes from '@modules/gateways/infra/http/routes/gateways.routes';

import endnodesRoutes from '@modules/endnodes/infra/http/routes/endnodes.routes';

import packagesRoutes from '@modules/endnodes/infra/http/routes/packages.routes';
import sensorsRoutes from '@modules/endnodes/infra/http/routes/sensors.routes';

const routes = Router();

routes.get('/', (_, res) =>
  res.json({
    message: `Welcome to Owlify API on ${process.env.NODE_ENV} mode`,
  }),
);

routes.use('/sessions', sessionsRoutes);
routes.use('/users', usersRoutes);

routes.use('/gateways', gatewaysRoutes);

routes.use('/endnodes', endnodesRoutes);

routes.use('/sensors', sensorsRoutes);
routes.use('/packages', packagesRoutes);

export default routes;
