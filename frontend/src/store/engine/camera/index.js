import * as Three from 'three';

import * as types from './types';

export default function reducer (
  state = {
    current: null,
    ready: false,
    posX: 0,
    posY: 0,
    posZ: 0,
    rotX: 0,
    rotY: 0,
    rotZ: 0
  },
  {
    type,
    posX,
    posY,
    posZ,
    rotX,
    rotY,
    rotZ
  }
) {
  switch (type) {
    case types.CREATE:
      return {
        ...state,
        current: new Three.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        ),
        ready: true
      };
    case types.DESTROY:
      return { ...state, current: null, ready: false };
    case types.POSX_ABSOLUTE:
      state.current.position.setX(posX);
      return { ...state, posX };
    case types.POSY_ABSOLUTE:
      state.current.position.setY(posY);
      return { ...state, posY };
    case types.POSZ_ABSOLUTE:
      state.current.position.setZ(posZ);
      return { ...state, posZ };
    case types.POSX_RELATIVE:
      state.current.position.setX(state.posX + posX);
      return { ...state, posX: state.posX + posX };
    case types.POSY_RELATIVE:
      state.current.position.setY(state.posY + posY);
      return { ...state, posY: state.posY + posY };
    case types.POSZ_RELATIVE:
      state.current.position.setZ(state.posZ + posZ);
      return { ...state, posZ: state.posZ + posZ };
    case types.ROTX_ABSOLUTE:
      state.current.rotation.setX(rotX);
      return { ...state, rotX };
    case types.ROTY_ABSOLUTE:
      state.current.rotation.setY(rotY);
      return { ...state, rotY };
    case types.ROTZ_ABSOLUTE:
      state.current.rotation.setZ(rotZ);
      return { ...state, rotZ };
    case types.ROTX_RELATIVE:
      state.current.rotation.setX(state.rotX + rotX);
      return { ...state, rotX: state.rotX + rotX };
    case types.ROTY_RELATIVE:
      state.current.rotation.setY(state.rotY + rotY);
      return { ...state, rotY: state.rotY + rotY };
    case types.ROTZ_RELATIVE:
      state.current.rotation.setZ(state.rotZ + rotZ);
      return { ...state, rotZ: state.rotZ + rotZ };
    default:
      return state;
  }
}
