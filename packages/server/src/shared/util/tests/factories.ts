// eslint-disable-next-line import/no-extraneous-dependencies
import factory from 'factory-girl';
import faker from 'faker';

import User from '@modules/users/infra/typeorm/entities/User';

import Gateway from '@modules/gateways/infra/typeorm/entities/Gateway';

import Endnode from '@modules/endnodes/infra/typeorm/entities/Endnode';

interface IPackage {
  snr: number;
  rssi: number;
  count: number;
  success: boolean;
}

interface ISensor {
  snr: number;
  rssi: number;
  count: number;
  humidity: number;
  temperature: number;
}

export const packageFactory = (): IPackage => ({
  snr: faker.random.number(10),
  rssi: faker.random.number(100),
  count: faker.random.number(100),
  success: faker.random.boolean(),
});

export const sensorFactory = (): ISensor => ({
  snr: faker.random.number(10),
  rssi: faker.random.number(100),
  count: faker.random.number(100),
  humidity: faker.random.number(100),
  temperature: faker.random.number(20),
});

factory.define('User', User, {
  name: faker.name.findName(),
  email: () => faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Gateway', Gateway, {
  locate: faker.commerce.department(),
});

factory.define('Endnode', Endnode, {
  room: faker.commerce.department(),
  name: faker.name.jobType(),
});

export default factory;
