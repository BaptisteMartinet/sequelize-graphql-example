import type { InferModelAttributesWithDefaults } from '@sequelize-graphql/core';

import { GraphQLNonNull, GraphQLString } from 'graphql';
import { Model, STRING } from '@sequelize-graphql/core';
import sequelize from '@db/index';
import { Book } from '@models/index';

export interface AuthorModel extends InferModelAttributesWithDefaults<AuthorModel> {
  firstname: string;
  lastname: string;
}

const Author: Model<AuthorModel> = new Model({
  name: 'Author',
  columns: {
    firstname: { type: STRING, allowNull: false, exposed: false },
    lastname: { type: STRING, allowNull: false, exposed: false },
  },
  fields: {
    fullname: {
      type: new GraphQLNonNull(GraphQLString),
      resolve(author) {
        const { firstname, lastname } = author;
        return `${firstname} ${lastname}`;
      },
    },
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
