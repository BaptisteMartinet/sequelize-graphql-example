import { GraphQLObjectType } from 'graphql';
import { exposeModel } from '@sequelize-graphql/core';
import { Author, Book } from '@models/index';

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
  },
});
