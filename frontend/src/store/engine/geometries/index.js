import * as Three from 'three';

import * as types from './types';

export default function reducer (
  state = { all: {} },
  {
    type, name, props,
    posX, posY, posZ,
    rotX, rotY, rotZ
  }
) {
  switch (type) {
    case types.NEW:
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            object: new Three.Mesh(
              new Three[`${props.geometryType}Geometry`](...props.geometrySpecs),
              new Three[`${props.materialType}Material`]({
                color: props.materialColor,
                wireframe: props.materialWireframe
              })
            ),
            ready: false,
            readyPos: false,
            readyRot: false,
            ...props.initialPosition,
            ...props.initialRotation
          }
        }
      };
    case types.DESTROY:
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
