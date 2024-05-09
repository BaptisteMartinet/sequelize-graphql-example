import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import sequelize from './db';
import schema from './schema';

async function main() {
  await sequelize.authenticate();
  console.info(`Database "${sequelize.getDatabaseName()}" is ready`);
  const server = new ApolloServer({ schema });
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.info(`Server ready at: ${url}`);
}

main().catch(console.error);
