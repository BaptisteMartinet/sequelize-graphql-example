import type { CreationOptional } from 'sequelize';
import type { InferModelAttributesWithDefaults } from '@sequelize-graphql/core';

import { Model, STRING, INTEGER } from '@sequelize-graphql/core';
import sequelize from '@db/index';
import { Book } from '@models/index';

export interface RatingModel extends InferModelAttributesWithDefaults<RatingModel> {
  rating: number;
  comment: CreationOptional<string>;
}

const Rating: Model<RatingModel> = new Model({
  name: 'Rating',
  columns: {
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
