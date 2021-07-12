import * as Three from 'three';

import * as types from './types';

export default function reducer (
  state = { all: {} },
  { type, name, props, color, offset, intensity }
) {
  switch (type) {
    case types.NEW:
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            object: new Three.PointLight(
              props.color,
              props.intensity,
              props.distance,
              props.decay
            ),
            color: props.color,
            ...props.initialPosition
          }
        }
      };
    case types.COLOR:
      state.all[name].object.color.set(color);
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            ...state.all[name],
            color
          }
        }
      };
    case types.INTENSITY:
      state.all[name].object.intensity.set(intensity);
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            ...state.all[name],
            intensity
          }
        }
      };
    case types.MOVEX_ABSOLUTE:
      state.all[name].object.position.setX(offset);
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            ...state.all[name],
            posX: offset
          }
        }
      };
    case types.MOVEY_ABSOLUTE:
      state.all[name].object.position.setY(offset);
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            ...state.all[name],
            posY: offset
          }
        }
      };
    case types.MOVEZ_ABSOLUTE:
      state.all[name].object.position.setZ(offset);
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            ...state.all[name],
            posZ: offset
          }
        }
      };
    case types.MOVEX_RELATIVE:
      state.all[name].object.position.setX(state.all[name].posX + offset);
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            ...state.all[name],
            posX: state.all[name].posX + offset
          }
        }
      };
    case types.MOVEY_RELATIVE:
      state.all[name].object.position.setY(state.all[name].posY + offset);
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            ...state.all[name],
            posY: state.all[name].posY + offset
          }
        }
      };
    case types.MOVEZ_RELATIVE:
      state.all[name].object.position.setZ(state.all[name].posZ + offset);
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            ...state.all[name],
            posZ: state.all[name].posZ + offset
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
    default:
      return state;
  }
}
