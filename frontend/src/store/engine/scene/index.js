import * as Three from 'three';

import * as types from './types';

export default function reducer (
  state = { current: null },
  { type, object }
) {
  switch (type) {
    case types.CREATE:
      return {
        ...state,
        current: new Three.Scene()
      };
    case types.DESTROY:
      return { ...state, current: null };
    case types.ADD:
      state.current.add(object);
      return state;
    case types.REMOVE:
      state.current.remove(object);
      return state;
    default:
      return state;
  }
}
