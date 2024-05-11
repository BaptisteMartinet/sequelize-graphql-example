import { GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType, GraphQLString } from 'graphql';
import { Author } from '@models/index';

export default new GraphQLObjectType({
  name: 'AuthorMutation',
  fields: {
    create: {
      type: new GraphQLNonNull(Author.type),
      args: {
        input: {
          type: new GraphQLNonNull(
            new GraphQLInputObjectType({
              name: 'CreateAuthorInput',
              fields: {
                name: { type: new GraphQLNonNull(GraphQLString) },
              },
            }),
          ),
        },
      },
      async resolve(_, args, ctx) {
        const {
          input: { name },
        } = args;
        return Author.model.create({ name });
      },
    },
  },
});
