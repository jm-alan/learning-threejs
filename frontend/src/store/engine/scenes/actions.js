import * as types from './types';

export const SetScene = name => ({
  type: types.CURRENT,
  name
});

export const CreateScene = name => ({
  type: types.CREATE,
  name
});

export const DestroyScene = name => ({
  type: types.DESTROY,
  name
});

export const AddToScene = ({ object }) => ({
  type: types.ADD,
  object
});

export const RemoveFromScene = ({ object }) => ({
  type: types.REMOVE,
  object
});
