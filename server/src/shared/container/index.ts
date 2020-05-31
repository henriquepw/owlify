import { container } from 'tsyringe';

import '@modules/users/providers';

import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

import GatewaysRepository from '@modules/gateways/infra/typeorm/repositories/GatewaysRepository';
import IGatewaysRepository from '@modules/gateways/repositories/IGatewaysRepository';

import PackagesRepository from '@modules/endnodes/infra/influx/repositories/PackagesRepository';
import EndnodesRepository from '@modules/endnodes/infra/typeorm/repositories/EndnodesRepository';
import IEndnodesRepository from '@modules/endnodes/repositories/IEndnodesRepository';
import IPackagesRepository from '@modules/endnodes/repositories/IPackagesRepository';

container.registerSingleton<IGatewaysRepository>(
  'GatewaysRepository',
  GatewaysRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<IEndnodesRepository>(
  'EndnodesRepository',
  EndnodesRepository,
);

container.registerSingleton<IPackagesRepository>(
  'PackagesRepository',
  PackagesRepository,
);
