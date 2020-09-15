import influx from '@shared/infra/database/influx';

interface IEnv extends NodeJS.ProcessEnv {
  DB_NAME: string;
}

export async function cleanInflux(): Promise<void> {
  const { DB_NAME } = process.env as IEnv;

  const databases = await influx.getDatabaseNames();

  if (databases.includes(DB_NAME)) {
    await influx.dropDatabase(DB_NAME);
  }

  return influx.createDatabase(DB_NAME);
}

export default cleanInflux;
