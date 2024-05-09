import type { InferModelAttributesWithDefaults } from '@sequelize-graphql/core';

import { Model, STRING } from '@sequelize-graphql/core';
import sequelize from '@db/index';
import { Book } from '@models/index';

export interface AuthorModel extends InferModelAttributesWithDefaults<AuthorModel> {
  name: string;
}

const Author: Model<AuthorModel> = new Model({
  name: 'Author',
  columns: {
    name: { type: STRING, allowNull: false, exposed: true },
  },
  associations: () => ({
    books: {
      model: Book,
      type: 'hasMany',
      exposed: true,
    },
  }),
  timestamps: true,
  sequelize,
});

export default Author;
