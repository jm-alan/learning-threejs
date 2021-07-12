import * as types from './types';

export const CreateAmbientLight = (name, color) => ({
  type: types.NEW,
  name,
  color
});

export const RemoveAmbientLight = (name, parent) => ({
  type: types.DESTROY,
  name,
  parent
});

export const ColorAmbientLight = (name, color) => ({
  type: types.COLOR,
  name,
  color
});
