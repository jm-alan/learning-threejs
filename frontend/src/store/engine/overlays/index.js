import * as types from './types';

export default function reducer (
  state = { current: {}, debug: false, mooring: null },
  { type, mooring, name, component }
) {
  switch (type) {
    case types.SHOW_DEBUG:
      return { ...state, debug: true };
    case types.HIDE_DEBUG:
      return { ...state, debug: false };
    case types.MOORING:
      return { ...state, mooring };
    case types.ADD:
      return {
        ...state,
        current: {
          ...state.current,
          [name]: component
        }
      };
    case types.REMOVE:
      delete state.current[name];
      return {
        ...state,
        current: { ...state.current }
      };
    default:
      return state;
  }
}
