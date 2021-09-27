import * as types from './types';

export default function reducer (
  state = { default: true, debug: false },
  { type }
) {
  switch (type) {
    case types.DEFAULT:
      return { ...state, default: true, debug: false };
    case types.DEBUG:
      return { ...state, default: false, debug: true };
    default:
      return state;
  }
}
