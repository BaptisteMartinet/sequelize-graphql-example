import { GraphQLID, GraphQLNonNull, GraphQLString } from 'graphql';
import { genModelMutations } from '@sequelize-graphql/core';
import { Book, Author, GenreEnum } from '@models/index';

export default genModelMutations(Book, {
  create: {
    args: {
      authorId: { type: new GraphQLNonNull(GraphQLID) },
      title: { type: new GraphQLNonNull(GraphQLString) },
      genre: { type: new GraphQLNonNull(GenreEnum.gqlType) },
    },
    async resolve(_, args, ctx) {
      const { authorId, title, genre } = args;
      await Author.ensureExistence(authorId, { ctx });
      return Book.model.create({ authorId, title, genre });
    },
  },

  delete: true,
});
