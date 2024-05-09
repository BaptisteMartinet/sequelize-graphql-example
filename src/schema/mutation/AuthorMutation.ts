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
                firstname: { type: new GraphQLNonNull(GraphQLString) },
                lastname: { type: new GraphQLNonNull(GraphQLString) },
              },
            }),
          ),
        },
      },
      async resolve(_, args, ctx) {
        const {
          input: { firstname, lastname },
        } = args;
        return Author.model.create({ firstname, lastname });
      },
    },
  },
});
