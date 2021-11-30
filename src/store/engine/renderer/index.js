import * as types from './types';

export default function reducer (
  state = {
    current: null,
    ready: false,
    keys: [],
    functions: {},
    paused: false,
    changed: false
  },
  { type }
) {
  switch (type) {
    case types.READY:
      return { ...state, ready: true };
    case types.UNREADY:
      return { ...state, ready: false };
    case types.PAUSE:
      return {
        ...state,
        paused: true
      };
    case types.UNPAUSE:
      return {
        ...state,
        paused: false
      };
    default:
      return state;
  }
}
