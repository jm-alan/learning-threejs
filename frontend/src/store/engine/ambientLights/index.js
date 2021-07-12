import * as Three from 'three';

import * as types from './types';

export default function reducer (
  state = { all: {} },
  { type, name, color, parent }
) {
  switch (type) {
    case types.NEW:
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            light: new Three.AmbientLight(color),
            color
          }
        }
      };
    case types.DESTROY:
      parent.remove(state.all[name]);
      delete state.all[name];
      return { ...state, all: { ...state.all } };
    case types.COLOR:
      state.all[name].color.set(color);
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
    default:
      return state;
  }
}
