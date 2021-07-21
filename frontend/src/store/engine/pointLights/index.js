import * as types from './types';

export default function reducer (
  state = { all: {} },
  { type, name, object, props, color, offset, intensity }
) {
  switch (type) {
    case types.NEW:
      return {
        ...state,
        all: {
          ...state.all,
          [name]: {
            object,
            color: props.color,
            intensity: props.intensity,
            distance: props.distance,
            decay: props.decay,
            ...props.initialPosition
          }
        }
      };
    case types.COLOR:
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
