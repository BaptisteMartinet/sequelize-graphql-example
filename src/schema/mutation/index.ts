import { GraphQLObjectType } from 'graphql';
import { scopedField } from '@sequelize-graphql/core';
import AuthorMutation from './AuthorMutation';
import BookMutation from './BookMutation';
import RatingMutation from './RatingMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    book: scopedField(BookMutation),
    author: scopedField(AuthorMutation),
    rating: scopedField(RatingMutation),
  },
});
