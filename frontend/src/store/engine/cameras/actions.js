import * as types from './types';

export const CreatePerspectiveCamera = (
  name, FOV = 75, frustNear = 0.1,
  frustFar = 1000, initialPosition = { posX: 0, posY: 0, posZ: 0 },
  initialRotation = { rotX: 0, rotY: 0, rotZ: 0 }
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

export const CallCamera = name => ({
  type: types.NAME,
  name
});

export const ReadyCamera = name => ({
  type: types.READY,
  name
});

export const ReadyCameraPos = name => ({
  type: types.READY_POS,
  name
});

export const ReadyCameraRot = name => ({
  type: types.READY_ROT,
  name
});

export const MoveCameraX = {
  relative (name, posX) {
    return {
      type: types.POSX_RELATIVE,
      name,
      posX
    };
  },
  absolute (name, posX) {
    return {
      type: types.POSX_ABSOLUTE,
      name,
      posX
    };
  }
};

export const MoveCameraY = {
  relative (name, posY) {
    return {
      type: types.POSY_RELATIVE,
      name,
      posY
    };
  },
  absolute (name, posY) {
    return {
      type: types.POSY_ABSOLUTE,
      name,
      posY
    };
  }
};

export const MoveCameraZ = {
  relative (name, posZ) {
    return {
      type: types.POSZ_RELATIVE,
      name,
      posZ
    };
  },
  absolute (name, posZ) {
    return {
      type: types.POSZ_ABSOLUTE,
      name,
      posZ
    };
  }
};

export const RotCameraX = {
  relative (name, rotX) {
    return {
      type: types.ROTX_RELATIVE,
      name,
      rotX
    };
  },
  absolute (name, rotX) {
    return {
      type: types.ROTX_ABSOLUTE,
      name,
      rotX
    };
  }
};

export const RotCameraY = {
  relative (name, rotY) {
    return {
      type: types.ROTY_RELATIVE,
      name,
      rotY
    };
  },
  absolute (name, rotY) {
    return {
      type: types.ROTY_ABSOLUTE,
      name,
      rotY
    };
  }
};

export const RotCameraZ = {
  relative (name, rotZ) {
    return {
      type: types.ROTZ_RELATIVE,
      name,
      rotZ
    };
  },
  absolute (name, rotZ) {
    return {
      type: types.ROTZ_ABSOLUTE,
      name,
      rotZ
    };
  }
};
