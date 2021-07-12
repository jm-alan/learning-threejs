import * as Three from 'three';

import * as types from './types';

export default function reducer (
  state = { all: {} },
  { type, name, props, color, offset }
) {
  switch (type) {
    case types.NEW:
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            light: new Three.PointLight(
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
      state.all[name].light.color.set(color);
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
    case types.MOVEX_ABSOLUTE:
      state.all[name].light.position.setX(offset);
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
      state.all[name].light.position.setY(offset);
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
      state.all[name].light.position.setZ(offset);
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
      state.all[name].light.position.setX(state.all[name].posX + offset);
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
      state.all[name].light.position.setY(state.all[name].posY + offset);
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
      state.all[name].light.position.setZ(state.all[name].posZ + offset);
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
