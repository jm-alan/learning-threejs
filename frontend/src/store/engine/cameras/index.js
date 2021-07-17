import * as Three from 'three';

import * as types from './types';

const initialCamera = {
  name: null,
  object: null
};

export default function reducer (
  state = {
    current: initialCamera,
    all: {},
    called: null
  },
  {
    type, props, name,
    posX, posY, posZ,
    rotX, rotY, rotZ
  }
) {
  switch (type) {
    case types.CALL:
      return {
        ...state,
        name
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
            name,
            readyPos: false,
            readyRot: false,
            ready: false,
            object: new Three.PerspectiveCamera(
              props.FOV,
              window.innerWidth / window.innerHeight,
              props.frustNear,
              props.frustFar
            ),
            ...props.initialPosition,
            ...props.initialRotation
          }
        }
      };
    case types.DESTROY:
      if (state.current.name === name) state.current = { ...initialCamera };
      delete state.all[name];
      return {
        ...state,
        all: {
          ...state.all
        }
      };
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
    case types.POSX_ABSOLUTE:
      state.all[name].posX = posX;
      return state;
    case types.POSY_ABSOLUTE:
      state.all[name].posY = posY;
      return state;
    case types.POSZ_ABSOLUTE:
      state.all[name].posZ = posZ;
      return state;
    case types.POSX_RELATIVE:
      state.all[name].posX += posX;
      return state;
    case types.POSY_RELATIVE:
      state.all[name].posY += posY;
      return state;
    case types.POSZ_RELATIVE:
      state.all[name].posZ += posZ;
      return state;
    case types.ROTX_ABSOLUTE:
      state.all[name].rotX = rotX;
      return state;
    case types.ROTY_ABSOLUTE:
      state.all[name].rotY = rotY;
      return state;
    case types.ROTZ_ABSOLUTE:
      state.all[name].rotZ = rotZ;
      return state;
    case types.ROTX_RELATIVE:
      state.all[name].rotX += rotX;
      return state;
    case types.ROTY_RELATIVE:
      state.all[name].rotY += rotY;
      return state;
    case types.ROTZ_RELATIVE:
      state.all[name].rotZ += rotZ;
      return state;
    default:
      return state;
  }
}
