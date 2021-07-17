import * as types from './types';

export const CallScene = name => ({
  type: types.CALL,
  name
});

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

export const AddToScene = (name, { object }) => ({
  type: types.ADD,
  name,
  object
});

export const RemoveFromScene = (name, { object }) => ({
  type: types.REMOVE,
  object
});
