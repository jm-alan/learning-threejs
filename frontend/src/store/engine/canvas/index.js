import * as types from './types';

export default function reducer (
  state = { current: null, ready: false },
  { type, current }
) {
  switch (type) {
    case types.SET:
      return { ...state, current, ready: true };
    case types.UNSET:
      return { ...state, current: null, ready: false };
    default:
      return state;
  }
}
