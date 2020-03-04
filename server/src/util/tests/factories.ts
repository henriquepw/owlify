import faker from 'faker';
import factory from 'factory-girl';

import User from '../../app/models/User';
import Gateway from '../../app/models/Gateway';

export const packageFactory = () => ({
  snr: faker.random.number(10),
  rssi: faker.random.number(100),
  success: faker.random.boolean(),
});

export const sensorFactory = () => ({
  snr: faker.random.number(10),
  rssi: faker.random.number(100),
  humidity: faker.random.number(100),
  temperature: faker.random.number(20),
});

factory.define('User', User, {
  name: faker.name.findName(),
  email: faker.internet.email(),
  password: faker.internet.password(),
});

factory.define('Gateway', Gateway, {
  locate: faker.commerce.department(),
});

export default factory;
