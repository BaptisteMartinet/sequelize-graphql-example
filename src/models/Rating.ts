import type { CreationOptional, ForeignKey } from 'sequelize';
import type { IdType, InferModelAttributesWithDefaults } from '@sequelize-graphql/core';

import { Model, STRING, INTEGER, ID } from '@sequelize-graphql/core';
import sequelize from '@db/index';
import { Book } from '@models/index';

export interface RatingModel extends InferModelAttributesWithDefaults<RatingModel> {
  bookId: ForeignKey<IdType>;
  rating: number;
  comment: CreationOptional<string | null>;
}

const Rating: Model<RatingModel> = new Model({
  name: 'Rating',
  columns: {
    bookId: { type: ID, allowNull: false, exposed: true },
    rating: { type: INTEGER, allowNull: false, exposed: true },
    comment: { type: STRING, allowNull: true, exposed: true },
  },
  associations: () => ({
    book: {
      model: Book,
      type: 'belongsTo',
      exposed: true,
    },
  }),
  timestamps: true,
  sequelize,
});

export default Rating;
