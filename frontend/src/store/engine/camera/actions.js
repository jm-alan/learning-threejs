import * as types from './types';

export const CreatePerspectiveCamera = (
  name, FOV, frustNear,
  frustFar, initialPosition, initialRotation
) => ({
  type: types.CREATE,
  name,
  props: {
    FOV,
    frustNear,
    frustFar,
    initialPosition,
    initialRotation
  }
});

export const DestroyPerspectiveCamera = name => ({
  type: types.DESTROY,
  name
});

export const SetCamera = name => ({
  type: types.CURRENT,
  name
});

export const ReadyCamera = name => ({
  type: types.READY,
  name
});

export const MoveCameraX = {
  relative (posX) {
    return {
      type: types.POSX_RELATIVE,
      posX
    };
  },
  absolute (posX) {
    return {
      type: types.POSX_ABSOLUTE,
      posX
    };
  }
};

export const MoveCameraY = {
  relative (posY) {
    return {
      type: types.POSY_RELATIVE,
      posY
    };
  },
  absolute (posY) {
    return {
      type: types.POSY_ABSOLUTE,
      posY
    };
  }
};

export const MoveCameraZ = {
  relative (posZ) {
    return {
      type: types.POSZ_RELATIVE,
      posZ
    };
  },
  absolute (posZ) {
    return {
      type: types.POSZ_ABSOLUTE,
      posZ
    };
  }
};

export const RotCameraX = {
  relative (rotX) {
    return {
      type: types.ROTX_RELATIVE,
      rotX
    };
  },
  absolute (rotX) {
    return {
      type: types.ROTX_ABSOLUTE,
      rotX
    };
  }
};

export const RotCameraY = {
  relative (rotY) {
    return {
      type: types.ROTY_RELATIVE,
      rotY
    };
  },
  absolute (rotY) {
    return {
      type: types.ROTY_ABSOLUTE,
      rotY
    };
  }
};

export const RotCameraZ = {
  relative (rotZ) {
    return {
      type: types.ROTZ_RELATIVE,
      rotZ
    };
  },
  absolute (rotZ) {
    return {
      type: types.ROTZ_ABSOLUTE,
      rotZ
    };
  }
};
