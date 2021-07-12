import * as types from './types';

export default function reducer (
  state = { pressed: {} },
  { type, key }
) {
  switch (type) {
    case types.PRESS:
      return {
        ...state,
        pressed: {
          ...state.pressed,
          [key]: true
        }
      };
    case types.RELEASE:
      delete state.pressed[key];
      return {
        ...state,
        pressed: {
          ...state.pressed
        }
      };
    default:
      return state;
  }
}
