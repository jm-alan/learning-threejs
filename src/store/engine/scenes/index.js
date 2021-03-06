import * as types from './types';

const initialScene = {
  name: null,
  object: null
};

export default function reducer (
  state = {
    called: null,
    current: { ...initialScene },
    all: {}
  },
  { type, object, name }
) {
  switch (type) {
    case types.CALL:
      return {
        ...state,
        called: name
      };
    case types.CURRENT:
      return {
        ...state,
        current: {
          name,
          object: state.all[name]
        }
      };
    case types.CREATE:
      return {
        ...state,
        all: {
          ...state.all,
          [name]: object
        }
      };
    case types.DESTROY:
      delete state.all[name];
      if (name === state.current.name) {
        delete state.current.object;
        delete state.current.name;
        delete state.current;
        return {
          ...state,
          called: null,
          current: {
            ...initialScene
          },
          all: {
            ...state.all
          }
        };
      }
      return {
        ...state,
        all: {
          ...state.all
        }
      };
    case types.ADD:
      state.all[name].add(object);
      return state;
    case types.REMOVE:
      state.all[name].remove(object);
      return state;
    default:
      return state;
  }
}
