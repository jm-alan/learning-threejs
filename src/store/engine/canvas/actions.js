import * as types from './types';

export const SetCanvas = current => ({
  type: types.SET,
  current
});

export const UnsetCanvas = () => ({
  type: types.UNSET
});
