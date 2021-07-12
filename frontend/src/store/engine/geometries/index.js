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
            mesh: new Three.Mesh(
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
    default:
      return state;
  }
}
