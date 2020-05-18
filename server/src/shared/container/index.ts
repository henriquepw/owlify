import { container } from 'tsyringe';

import '@modules/users/providers';

import IGatewaysRepository from '@modules/gateways/repositories/IGatewaysRepository';
import GatewaysRepository from '@modules/gateways/infra/typeorm/repositories/GatewaysRepository';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IGatewaysRepository>(
  'GatewaysRepository',
  GatewaysRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
