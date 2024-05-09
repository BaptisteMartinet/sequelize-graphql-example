import type { InferModelAttributesWithDefaults } from '@sequelize-graphql/core';

import { Model, STRING } from '@sequelize-graphql/core';
import sequelize from '@db/index';
import { Author, Rating } from '@models/index';

export interface BookModel extends InferModelAttributesWithDefaults<BookModel> {
  title: string;
}

const Book: Model<BookModel> = new Model({
  name: 'Book',
  columns: {
    title: { type: STRING, allowNull: false, exposed: true },
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
