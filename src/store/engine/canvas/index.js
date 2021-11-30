import * as types from './types';

export default function reducer (
  state = { current: null, mouseLock: false },
  { type, current }
) {
  switch (type) {
    case types.SET:
      return { ...state, current };
    case types.UNSET:
      return { ...state, current: null };
    case types.LOCK_POINTER:
      return { ...state, mouseLock: true };
    case types.UNLOCK_POINTER:
      return { ...state, mouseLock: false };
    default:
      return state;
  }
}
