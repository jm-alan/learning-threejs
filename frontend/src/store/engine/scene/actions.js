import * as types from './types';

export const CreateScene = () => ({
  type: types.CREATE
});

export const DestroyScene = () => ({
  type: types.DESTROY
});

export const AddToScene = element => ({
  type: types.ADD,
  element
});

export const RemoveFromScene = element => ({
  type: types.REMOVE,
  element
});
