import type { StandaloneServerContextFunctionArgument } from '@apollo/server/dist/esm/standalone';

import assert from 'assert';
import { makeContext as makeContext_ } from '@sequelize-graphql/core';

export type Context = Awaited<ReturnType<typeof makeContext>>;

export default async function makeContext(args: StandaloneServerContextFunctionArgument) {
  const { req } = args;
  const authToken = req.headers.authorization;
  assert(authToken, 'Missing authorization header');
  return {
    ...makeContext_(),
    authToken,
  } as const;
}
