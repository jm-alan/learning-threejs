import * as types from './types';

export default function reducer (
  state = {
    current: null,
    ready: false,
    keys: [],
    functions: {},
    paused: false,
    changed: false
  },
  { type, object, name, action }
) {
  switch (type) {
    case types.CREATE:
      return {
        ...state,
        current: object
      };
    case types.DESTROY:
      return { ...state, current: null, ready: false };
    case types.BUILD_DEFAULT:
      state.current.setPixelRatio(window.devicePixelRatio);
      state.current.setSize(window.innerWidth, window.innerHeight);
      return { ...state, ready: true };
    case types.ADD_FUNCTION:
      state.functions[name] = action;
      state.keys.push(name);
      return state;
    case types.REMOVE_FUNCTION:
      delete state.functions[name];
      state.keys.splice(0, state.keys.length, ...Object.keys(state.functions));
      return state;
    case types.DUMP_FUNCTIONS:
      state.functions = {};
      state.keys.splice(0, state.keys.length);
      return state;
    case types.DUMP_LISTS:
      state.current.renderLists.dispose();
      return state;
    case types.PAUSE:
      return {
        ...state,
        paused: true
      };
    case types.UNPAUSE:
      return {
        ...state,
        paused: false
      };
    default:
      return state;
  }
}
