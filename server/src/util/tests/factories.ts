import faker from 'faker';

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
