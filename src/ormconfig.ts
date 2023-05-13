import { configuration } from './config/configuration';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

export const getORMConfig = (): PostgresConnectionOptions => {
  const { dbHost, username, password, dbName } = configuration().databaseConfig;

  const config: PostgresConnectionOptions = {
    type: 'postgres',
    host: dbHost,
    port: 5432,
    username,
    password,
    database: dbName,
    entities: [`${__dirname}/**/*.entity{.ts,.js}`],
    synchronize: true,
  };
  return config;
};
