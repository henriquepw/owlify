import influx from '../../src/database';

async function createDB() {
  const databases = await influx.getDatabaseNames();

  if (!databases.includes(process.env.DB_NAME)) {
    await influx.createDatabase(process.env.DB_NAME);
  }
}

async function DropDB() {
  await influx.dropDatabase(process.env.DB_NAME);
}

export {
  createDB,
  DropDB,
};
