import * as types from './types';

export const CreatePerspectiveCamera = () => ({
  type: types.CREATE
});

export const DestroyPerspectiveCamera = () => ({
  type: types.DESTROY
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
    console.log('PosY relative==============================');
    console.log('PosY relative==============================');
    console.log('PosY relative==============================');
    console.log('PosY relative==============================');
    console.log(posY);
    console.log('PosY relative==============================');
    console.log('PosY relative==============================');
    console.log('PosY relative==============================');
    console.log('PosY relative==============================');
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
