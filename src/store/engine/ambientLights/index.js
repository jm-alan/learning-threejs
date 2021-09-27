import * as types from './types';

export default function reducer (
  state = { all: {} },
  { type, object, name, color, intensity }
) {
  switch (type) {
    case types.NEW:
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            object,
            color,
            intensity
          }
        }
      };
    case types.DESTROY:
      delete state.all[name];
      return { ...state, all: { ...state.all } };
    case types.COLOR:
      state.all[name].object.color.set(color);
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            ...state.all[name],
            color
          }
        }
      };
    case types.INTENSITY:
      state.all[name].object.intensity.set(intensity);
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            ...state.all[name],
            intensity
          }
        }
      };
    default:
      return state;
  }
}
