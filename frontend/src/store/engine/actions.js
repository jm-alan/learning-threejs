import * as types from './types';

export const SetScene = scene => ({
  type: types.SCENE,
  scene
});

export const SetCamera = camera => ({
  type: types.CAMERA,
  camera
});

export const SetRenderer = renderer => ({
  type: types.RENDERER,
  renderer
});

export const SetCanvas = canvas => ({
  type: types.CANVAS,
  canvas
});

export const CreateGeometry = (
  name, geometryType, geometrySpecs,
  materialType, materialColor = 0xFFFFFF, materialWireframe = false,
  initialPosition = { posX: 0, posY: 0, posZ: 0 },
  initialRotation = { rotX: 0, rotY: 0, rotZ: 0 }
) => ({
  type: types.NEW_GEOMETRY,
  name,
  props: {
    geometryType,
    geometrySpecs,
    materialType,
    materialColor,
    materialWireframe,
    initialPosition,
    initialRotation
  }
});

export const DestroyGeometry = name => ({
  type: types.DESTROY_GEOMETRY,
  name
});

export const RotateGeometry = (name, axis, offset) => ({

});

export const AddToScene = (name, element) => ({
  type: types.ADD_TO_SCENE,
  name,
  element
});

export const AddRenderFunction = (name, renderFunction) => ({
  type: types.ADD_RENDER_FUNCTION,
  name,
  renderFunction
});

export const RemoveRenderFunction = name => ({
  type: types.REMOVE_RENDER_FUNCTION,
  name
});

export const CreatePointLight = (name, color = 0xFFFFFF) => ({
  type: types.NEW_POINTLIGHT,
  name,
  color
});

export const CreateAmbientLight = (name, color) => ({
  type: types.NEW_AMBIENTLIGHT,
  name,
  color
});

export const SetLightColor = (lightType, name, color) => ({
  type: types.LIGHT_COLOR,
  lightType,
  name,
  color
});

export const PressKey = key => ({
  type: types.PRESS_KEY,
  key
});

export const ReleaseKey = key => ({
  type: types.RELEASE_KEY,
  key
});

export const MoveCameraX = {
  relative (cameraPosX) {
    return {
      type: types.CAMERA_POSX_RELATIVE,
      cameraPosX
    };
  },
  absolute (cameraPosX) {
    return {
      type: types.CAMERA_POSX_ABSOLUTE,
      cameraPosX
    };
  }
};

export const MoveCameraY = {
  relative (cameraPosY) {
    return {
      type: types.CAMERA_POSY_RELATIVE,
      cameraPosY
    };
  },
  absolute (cameraPosY) {
    return {
      type: types.CAMERA_POSY_ABSOLUTE,
      cameraPosY
    };
  }
};

export const MoveCameraZ = {
  relative (cameraPosZ) {
    return {
      type: types.CAMERA_POSZ_RELATIVE,
      cameraPosZ
    };
  },
  absolute (cameraPosZ) {
    return {
      type: types.CAMERA_POSZ_ABSOLUTE,
      cameraPosZ
    };
  }
};

export const RotCameraX = {
  relative (cameraRotX) {
    return {
      type: types.CAMERA_ROTX_RELATIVE,
      cameraRotX
    };
  },
  absolute (cameraRotX) {
    return {
      type: types.CAMERA_ROTX_ABSOLUTE,
      cameraRotX
    };
  }
};

export const RotCameraY = {
  relative (cameraRotY) {
    return {
      type: types.CAMERA_ROTY_RELATIVE,
      cameraRotY
    };
  },
  absolute (cameraRotY) {
    return {
      type: types.CAMERA_ROTY_ABSOLUTE,
      cameraRotY
    };
  }
};

export const RotCameraZ = {
  relative (cameraRotZ) {
    return {
      type: types.CAMERA_ROTZ_RELATIVE,
      cameraRotZ
    };
  },
  absolute (cameraRotZ) {
    return {
      type: types.CAMERA_ROTZ_ABSOLUTE,
      cameraRotZ
    };
  }
};

export const MoveLightX = {
  relative (name, offset) {
    return {
      type: types.LIGHTX_RELATIVE,
      name,
      offset
    };
  },
  absolute (name, offset) {
    return {
      type: types.LIGHTX_ABSOLUTE,
      name,
      offset
    };
  }
};

export const MoveLightY = {
  relative (name, offset) {
    return {
      type: types.LIGHTY_RELATIVE,
      name,
      offset
    };
  },
  absolute (name, offset) {
    return {
      type: types.LIGHTY_ABSOLUTE,
      name,
      offset
    };
  }
};

export const MoveLightZ = {
  relative (name, offset) {
    return {
      type: types.LIGHTZ_RELATIVE,
      name,
      offset
    };
  },
  absolute (name, offset) {
    return {
      type: types.LIGHTZ_ABSOLUTE,
      name,
      offset
    };
  }
};

export const Render = () => ({
  type: types.RENDER
});

export const BuildDefault = () => ({
  type: types.BUILD_DEFAULT
});

export const DestroyEngine = () => ({
  type: types.DESTROY_ENGINE
});

export const DestroyCanvas = () => ({
  type: types.DESTROY_CANVAS
});
