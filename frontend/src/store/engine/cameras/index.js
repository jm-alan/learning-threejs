import * as types from './types';

const initialCamera = {
  name: null,
  object: null
};

export default function reducer (
  state = {
    current: { ...initialCamera },
    all: {},
    called: null,
    functions: {},
    keys: []
  },
  { type, props, name, action, object }
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
          object: state.all[name].object
        }
      };
    case types.CREATE:
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            readyPos: false,
            readyRot: false,
            ready: false,
            object,
            ...props.initialPosition,
            ...props.initialRotation
          }
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
            ...initialCamera
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
    case types.ADD_FUNCTION:
      state.functions[name] = action;
      state.keys.splice(0, state.keys.length, ...Object.keys(state.functions));
      return state;
    case types.REMOVE_FUNCTION:
      delete state.functions[name];
      state.keys.splice(0, state.keys.length, ...Object.keys(state.functions));
      return state;
    case types.READY_POS:
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            ...state.all[name],
            readyPos: true
          }
        }
      };
    case types.READY_ROT:
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            ...state.all[name],
            readyRot: true
          }
        }
      };
    case types.READY:
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            ...state.all[name],
            ready: true
          }
        }
      };
    default:
      return state;
  }
}
