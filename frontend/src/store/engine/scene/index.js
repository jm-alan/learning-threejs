import * as Three from 'three';

import * as types from './types';

export default function reducer (
  state = { current: null, ready: false },
  { type, element }
) {
  switch (type) {
    case types.CREATE:
      return {
        ...state,
        current: new Three.Scene(),
        ready: true
      };
    case types.DESTROY:
      return { ...state, current: null, ready: false };
    case types.ADD:
      state.current.add(element);
      return state;
    default:
      return state;
  }
}
