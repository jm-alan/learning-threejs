import * as types from './types';

export default function reducer (
  state = { debug: false, mooring: null },
  { type, mooring }
) {
  switch (type) {
    case types.SHOW_DEBUG:
      return { ...state, debug: true };
    case types.HIDE_DEBUG:
      return { ...state, debug: false };
    case types.MOORING:
      return { ...state, mooring };
    default:
      return state;
  }
}
