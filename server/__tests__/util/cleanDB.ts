import influx from '../../src/database';

export default async () => {
  const databases = await influx.getDatabaseNames();

  if (databases.includes(process.env.DB_NAME)) {
    await influx.dropDatabase(process.env.DB_NAME);
  }

  await influx.createDatabase(process.env.DB_NAME);
};
