import assert from 'assert';
import { Sequelize } from 'sequelize';

const databaseUrl = process.env.DATABASE_URL;
assert(databaseUrl, 'Missing DATABASE_URL env variable');

export default new Sequelize(databaseUrl);
