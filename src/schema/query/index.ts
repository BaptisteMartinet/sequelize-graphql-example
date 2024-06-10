import { GraphQLObjectType } from 'graphql';
import { GraphQLNonNullList, exposeModel } from '@sequelize-graphql/core';
import { Author, Book, Rating } from '@models/index';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...exposeModel(Author, {
      findById: 'author',
      findByIds: 'authorByIds',
      pagination: 'authors',
    }),

    ...exposeModel(Book, {
      findById: 'book',
      findByIds: false,
      pagination: 'books',
    }),

    ratings: {
      type: new GraphQLNonNullList(Rating.type),
      resolve: () => Rating.model.findAll(),
    },
  },
});
