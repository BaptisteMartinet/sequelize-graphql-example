import {
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString,
} from 'graphql';
import { Rating, Book } from '@models/index';

export default new GraphQLObjectType({
  name: 'RatingMutation',
  fields: {
    create: {
      type: new GraphQLNonNull(Rating.type),
      args: {
        input: {
          type: new GraphQLNonNull(
            new GraphQLInputObjectType({
              name: 'CreateRatingInput',
              fields: {
                bookId: { type: new GraphQLNonNull(GraphQLID) },
                rating: { type: new GraphQLNonNull(GraphQLInt) },
                comment: { type: GraphQLString },
              },
            }),
          ),
        },
      },
      async resolve(_, args, ctx) {
        const {
          input: { bookId, rating, comment },
        } = args;
        await Book.ensureExistence(bookId, { ctx });
        return Rating.model.create({ bookId, rating, comment });
      },
    },
  },
});
