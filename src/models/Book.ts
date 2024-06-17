import type { ForeignKey } from 'sequelize';
import type { IdType, InferModelAttributesWithDefaults } from '@sequelize-graphql/core';

import { GraphQLNonNull, GraphQLString } from 'graphql';
import { Model, STRING, ID, ENUM } from '@sequelize-graphql/core';
import sequelize from '@db/index';
import { Author, Rating } from '@models/index';

export enum Genre {
  Action = 'Action',
  Fantasy = 'Fantasy',
  ScienceFiction = 'ScienceFiction',
  Horror = 'Horror',
}

export const GenreEnum = ENUM({
  name: 'Genre',
  values: Genre,
});

export interface BookModel extends InferModelAttributesWithDefaults<BookModel> {
  authorId: ForeignKey<IdType>;
  title: string;
  genre: Genre;
}

const Book: Model<BookModel> = new Model({
  name: 'Book',
  columns: {
    authorId: { type: ID, allowNull: false, exposed: true },
    title: { type: STRING, allowNull: false, exposed: false },
    genre: { type: GenreEnum, allowNull: false, exposed: true },
  },
  fields: {
    fullTitle: {
      type: new GraphQLNonNull(GraphQLString),
      async resolve(book, args, ctx) {
        const { authorId, title } = book;
        const author = await Author.ensureExistence(authorId, { ctx });
        return `${title} by ${author.name}`;
      },
    },
  },
  associations: () => ({
    author: {
      model: Author,
      type: 'belongsTo',
      exposed: true,
    },

    ratings: {
      model: Rating,
      type: 'hasMany',
      exposed: true,
    },
  }),
  timestamps: true,
  sequelize,
});

export default Book;
