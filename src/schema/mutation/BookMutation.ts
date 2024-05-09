import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { Book, Author, GenreEnum } from '@models/index';

export default new GraphQLObjectType({
  name: 'BookMutation',
  fields: {
    create: {
      type: new GraphQLNonNull(Book.type),
      args: {
        input: {
          type: new GraphQLNonNull(
            new GraphQLInputObjectType({
              name: 'CreateBookInput',
              fields: {
                authorId: { type: new GraphQLNonNull(GraphQLID) },
                title: { type: new GraphQLNonNull(GraphQLString) },
                genre: { type: new GraphQLNonNull(GenreEnum.gqlType) },
              },
            }),
          ),
        },
      },
      async resolve(_, args, ctx) {
        const {
          input: { authorId, title, genre },
        } = args;
        await Author.ensureExistence(authorId, { ctx });
        return Book.model.create({ authorId, title, genre });
      },
    },

    delete: {
      type: new GraphQLNonNull(GraphQLBoolean),
      args: {
        id: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(_, args, ctx) {
        const { id } = args;
        await Book.ensureExistence(id, { ctx });
        await Book.model.destroy({ where: { id } });
        return true;
      },
    },
  },
});
