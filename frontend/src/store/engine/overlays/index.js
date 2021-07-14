import * as types from './types';

export default function reducer (
  state = { debug: false },
  { type }
) {
  switch (type) {
    case types.SHOW_DEBUG:
      return { ...state, debug: true };
    case types.HIDE_DEBUG:
      return { ...state, debug: false };
    default:
      return state;
  }
}
