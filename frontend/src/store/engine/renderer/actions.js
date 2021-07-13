import * as types from './types';

export const BuildDefault = () => ({
  type: types.BUILD_DEFAULT
});

export const CreateRenderer = canvas => ({
  type: types.CREATE,
  canvas
});

export const DestroyRenderer = () => ({
  type: types.DESTROY
});

export const AddRenderFunction = (name, action) => ({
  type: types.ADD_FUNCTION,
  renderObj: { name, action }
});

export const RemoveRenderFunction = name => ({
  type: types.REMOVE_FUNCTION,
  name
});

export const PauseRender = () => ({
  type: types.PAUSE
});

export const ResumeRender = () => ({
  type: types.UNPAUSE
});
