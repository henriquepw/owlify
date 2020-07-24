import { ConnectionOptions } from 'typeorm';

const root = process.env.NODE_ENV === 'production' ? 'dist' : 'src';
const ext = process.env.NODE_ENV === 'production' ? '.js' : '.ts';

const config = {
  type: process.env.PG_DIALECT,
  host: process.env.PG_HOST,
  port: process.env.PG_PORT,
  username: process.env.PG_USER,
  password: process.env.PG_PASS,
  database: process.env.PG_NAME,
  entities: [`./${root}/modules/**/infra/typeorm/entities/*${ext}`],
  migrations: [`./${root}/shared/infra/typeorm/migrations/*${ext}`],
  cli: {
    migrationsDir: `./${root}/shared/infra/typeorm/migrations`,
  },
};

export default config as ConnectionOptions;
