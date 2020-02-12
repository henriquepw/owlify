import influx from '../../database/influx';

interface Env extends NodeJS.ProcessEnv {
  DB_NAME: string;
}

export default async () => {
  const { DB_NAME } = process.env as Env;

  const databases = await influx.getDatabaseNames();

  if (databases.includes(DB_NAME)) {
    await influx.dropDatabase(DB_NAME);
  }

  await influx.createDatabase(DB_NAME);
};
