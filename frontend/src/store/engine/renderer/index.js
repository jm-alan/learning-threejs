import * as Three from 'three';

import * as types from './types';

export default function reducer (
  state = { current: null, ready: false, functions: {}, paused: false, changed: false },
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
      state.functions[name] = renderObj;
      state.changed = true;
      return state;
    case types.REMOVE_FUNCTION:
      delete state.functions[name];
      state.changed = true;
      return state;
    case types.DUMP_FUNCTIONS:
      state.functions = {};
      state.changed = true;
      return state;
    case types.DUMP_LISTS:
      state.current.renderLists.dispose();
      return state;
    case types.PAUSE:
      state.paused = true;
      return state;
    case types.UNPAUSE:
      state.paused = false;
      return state;
    default:
      return state;
  }
}
