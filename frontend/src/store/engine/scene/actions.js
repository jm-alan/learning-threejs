import * as types from './types';

export const CreateScene = () => ({
  type: types.CREATE
});

export const DestroyScene = () => ({
  type: types.DESTROY
});

export const AddToScene = ({ object }) => ({
  type: types.ADD,
  object
});

export const RemoveFromScene = ({ object }) => ({
  type: types.REMOVE,
  object
});
