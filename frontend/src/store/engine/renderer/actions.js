import * as types from './types';

export const BuildDefault = () => ({
  type: types.BUILD_DEFAULT
});

export const CreateRenderer = canvas => async dispatch => {
  const { WebGLRenderer } = await import('three');
  dispatch({
    type: types.CREATE,
    object: new WebGLRenderer({ canvas })
  });
};

export const DestroyRenderer = () => ({
  type: types.DESTROY
});

export const AddRenderFunction = (name, action) => ({
  type: types.ADD_FUNCTION,
  name,
  action
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

export const DumpRenderFunctions = () => ({
  type: types.DUMP_FUNCTIONS
});

export const DumpRenderLists = () => ({
  type: types.DUMP_LISTS
});

export const MarkFunctionsChanged = () => ({
  type: types.CHANGED
});

export const MarkFunctionsUnchanged = () => ({
  type: types.UNCHANGED
});
