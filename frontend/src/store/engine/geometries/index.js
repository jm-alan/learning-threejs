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
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            ...state.all[name],
            posX
          }
        }
      };
    case types.POSY_ABSOLUTE:
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            ...state.all[name],
            posY
          }
        }
      };
    case types.POSZ_ABSOLUTE:
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            ...state.all[name],
            posZ
          }
        }
      };
    case types.POSX_RELATIVE:
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            ...state.all[name],
            posX: state.all[name].posX + posX
          }
        }
      };
    case types.POSY_RELATIVE:
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            ...state.all[name],
            posY: state.all[name].posY + posY
          }
        }
      };
    case types.POSZ_RELATIVE:
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            ...state.all[name],
            posZ: state.all[name].posZ + posZ
          }
        }
      };
    case types.ROTX_ABSOLUTE:
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            ...state.all[name],
            rotX
          }
        }
      };
    case types.ROTY_ABSOLUTE:
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            ...state.all[name],
            rotY
          }
        }
      };
    case types.ROTZ_ABSOLUTE:
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            ...state.all[name],
            rotZ
          }
        }
      };
    case types.ROTX_RELATIVE:
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            ...state.all[name],
            rotX: state.all[name].rotX + rotX
          }
        }
      };
    case types.ROTY_RELATIVE:
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            ...state.all[name],
            rotY: state.all[name].rotY + rotY
          }
        }
      };
    case types.ROTZ_RELATIVE:
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            ...state.all[name],
            rotZ: state.all[name].rotZ + rotZ
          }
        }
      };
    default:
      return state;
  }
}
