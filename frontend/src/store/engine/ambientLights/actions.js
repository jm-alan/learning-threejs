import * as types from './types';

export const CreateAmbientLight = (name, color, intensity) => async dispatch => {
  const { AmbientLight } = await import('three');
  dispatch({
    type: types.NEW,
    name,
    color,
    intensity,
    object: new AmbientLight(color, intensity)

  });
};

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
