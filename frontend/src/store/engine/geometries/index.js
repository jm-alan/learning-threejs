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
      if (state.all[name]) {
        return {
          ...state,
          all: {
            ...state.all,
            [name]: {
              ...state.all[name],
              object: new Three.Mesh(
                new Three[`${state.all[name].type}Geometry`](...state.all[name].specs),
                new Three[`${state.all[name].material}Material`]({
                  color: state.all[name].color,
                  wireframe: state.all[name].wireframe
                })
              )
            }
          }
        };
      }
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
            specs: props.geometrySpecs,
            type: props.geometryType,
            material: props.materialType,
            color: props.materialColor,
            wireframe: props.materialWireframe,
            trashable: false,
            ready: false,
            readyPos: false,
            readyRot: false,
            ...props.initialPosition,
            ...props.initialRotation
          }
        }
      };
    case types.DESTROY_STRUCTURE:
      state.all[name].object.geometry.dispose();
      return state;
    case types.DESTROY_MATERIAL:
      state.all[name].object.material.dispose();
      return state;
    case types.DESTROY_MESH:
      delete state.all[name].object;
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            ...state.all[name],
            object: null,
            ready: false,
            readyRot: false,
            readyPos: false
          }
        }
      };
    case types.TRASHABLE:
      state.all[name].trashable = true;
      return state;
    case types.UNTRASHABLE:
      state.all[name].trashable = false;
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
