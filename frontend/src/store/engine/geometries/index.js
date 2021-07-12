import * as Three from 'three';

import * as types from './types';

export default function reducer (
  state = { all: {} },
  { type, name, props }
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
    default:
      return state;
  }
}
