import * as types from './types';

export default function reducer (
  state = { current: null },
  { type, current }
) {
  switch (type) {
    case types.SET:
      return { ...state, current };
    case types.UNSET:
      return { ...state, current: null };
    default:
      return state;
  }
}
