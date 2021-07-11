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

export const CreateGeometry = (name, geometry) => ({
  type: types.NEW_GEOMETRY,
  name,
  geometry
});

export const DestroyGeometry = name => ({
  type: types.DESTROY_GEOMETRY,
  name
});

export const AddToScene = (name, element) => ({
  type: types.ADD_TO_SCENE,
  name,
  element
});

export const CreatePointLight = (name, light, color) => ({
  type: types.NEW_POINTLIGHT,
  name,
  light,
  color
});

export const CreateAmbientLight = (name, light, color) => ({
  type: types.NEW_AMBIENTLIGHT,
  name,
  light,
  color
});

export const SetLightColor = (lightType, name, color) => ({
  type: types.LIGHT_COLOR,
  lightType,
  name,
  color
});

export const MoveCameraX = {
  relative (cameraX) {
    return {
      type: types.CAMERAX_RELATIVE,
      cameraX
    };
  },
  absolute (cameraX) {
    return {
      type: types.CAMERAX_ABSOLUTE,
      cameraX
    };
  }
};

export const MoveCameraY = {
  relative (cameraY) {
    return {
      type: types.CAMERAY_RELATIVE,
      cameraY
    };
  },
  absolute (cameraY) {
    return {
      type: types.CAMERAY_ABSOLUTE,
      cameraY
    };
  }
};

export const MoveCameraZ = {
  relative (cameraZ) {
    return {
      type: types.CAMERAZ_RELATIVE,
      cameraZ
    };
  },
  absolute (cameraZ) {
    return {
      type: types.CAMERAZ_ABSOLUTE,
      cameraZ
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
