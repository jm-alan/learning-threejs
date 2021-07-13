import * as Three from 'three';

import * as types from './types';

export default function reducer (
  state = { current: null, ready: false, functions: [], shouldPause: false },
  { type, canvas, name, renderObj }
) {
  switch (type) {
    case types.CREATE:
      return {
        ...state,
        current: new Three.WebGLRenderer({ canvas })
      };
    case types.DESTROY:
      return { ...state, current: null, ready: false };
    case types.BUILD_DEFAULT:
      state.current.setPixelRatio(window.devicePixelRatio);
      state.current.setSize(window.innerWidth, window.innerHeight);
      return { ...state, ready: true };
    case types.ADD_FUNCTION:
      state.functions.push(renderObj);
      return state;
    case types.REMOVE_FUNCTION:
      state.functions.splice(state.functions.findIndex(({ name: deleteName }) => name === deleteName), 1);
      return state;
    case types.DUMP_FUNCTIONS:
      state.functions.splice(0, state.functions.length);
      return state;
    case types.PAUSE:
      return { ...state, ready: false, shouldPause: true };
    case types.UNPAUSE:
      return { ...state, ready: true, shouldPause: false };
    default:
      return state;
  }
}
