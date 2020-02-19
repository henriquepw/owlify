import influx from '../../database/influx';
import postgres from '../../database';

interface Env extends NodeJS.ProcessEnv {
  DB_NAME: string;
}

export async function cleanInflux() {
  const { DB_NAME } = process.env as Env;

  const databases = await influx.getDatabaseNames();

  if (databases.includes(DB_NAME)) {
    await influx.dropDatabase(DB_NAME);
  }

  return influx.createDatabase(DB_NAME);
}

export function cleanPostgres() {
  return Promise.all(
    Object.keys(postgres.connection.models).map(key =>
      postgres.connection.models[key].destroy({
        truncate: true,
        force: true,
      }),
    ),
  );
}
