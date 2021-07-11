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
