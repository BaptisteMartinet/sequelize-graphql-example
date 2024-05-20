import { GraphQLNonNull, GraphQLString } from 'graphql';
import { genModelMutations } from '@sequelize-graphql/core';
import { Author } from '@models/index';

export default genModelMutations(Author, {
  create: {
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve(_, args, ctx) {
      const { name } = args;
      return Author.model.create({ name });
    },
  },
  update: {
    args: {
      name: { type: GraphQLString },
    },
    resolve(author, args, ctx) {
      return author.update({ name: args.name });
    },
  },
  delete: {
    resolve(author, args, ctx) {
      return author.destroy();
    },
  },
});
