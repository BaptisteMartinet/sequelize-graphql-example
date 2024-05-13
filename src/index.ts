import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import sequelize from './db';
import schema from './schema';
import context from 'context';

async function main() {
  await sequelize.authenticate();
  console.info(`Database "${sequelize.getDatabaseName()}" is ready`);

  // Uncomment to force sync DB
  // await sequelize.sync({ force: true });
  // const modelsCount = Object.keys(sequelize.models).length;
  // console.info(`${modelsCount} models synced`);

  const server = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
    context,
  });
  console.info(`Server ready at: ${url}`);
}

main().catch(console.error);
