import * as Three from 'three';

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
          [name]: new Three.Scene()
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
      state.current.object.add(object);
      return state;
    case types.REMOVE:
      state.current.object.remove(object);
      return state;
    default:
      return state;
  }
}
