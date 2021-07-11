const CANVAS = 'engine/CANVAS';
const SCENE = 'engine/SCENE';
const CAMERA = 'engine/CAMERA';
const RENDERER = 'engine/RENDERER';
const RENDER = 'engine/RENDER';
const CAMERAX_RELATIVE = 'engine/CAMERAX/RELATIVE';
const CAMERAY_RELATIVE = 'engine/CAMERAY/RELATIVE';
const CAMERAZ_RELATIVE = 'engine/CAMERAZ/RELATIVE';
const CAMERAX_ABSOLUTE = 'engine/CAMERAX/ABSOLUTE';
const CAMERAY_ABSOLUTE = 'engine/CAMERAY/ABSOLUTE';
const CAMERAZ_ABSOLUTE = 'engine/CAMERAZ/ABSOLUTE';
const ADD_TO_SCENE = 'engine/SCENE/ADD';
const NEW_GEOMETRY = 'engine/NEW_GEOMETRY';
const NEW_LIGHT = 'engine/NEW_LIGHT';
const DESTROY_GEOMETRY = 'engine/DESTROY_GEOMETRY';
const DESTROY_ENGINE = 'engine/DESTROY_ENGINE';
const DESTROY_CANVAS = 'engine/DESTROY_CANVAS';
const BUILD_DEFAULT = 'engine/BUILD_DEFAULT';

export const SetScene = scene => ({
  type: SCENE,
  scene
});

export const SetCamera = camera => ({
  type: CAMERA,
  camera
});

export const SetRenderer = renderer => ({
  type: RENDERER,
  renderer
});

export const SetCanvas = canvas => ({
  type: CANVAS,
  canvas
});

export const CreateGeometry = (name, geometry) => ({
  type: NEW_GEOMETRY,
  name,
  geometry
});

export const DestroyGeometry = name => ({
  type: DESTROY_GEOMETRY,
  name
});

export const AddToScene = (name, element) => ({
  type: ADD_TO_SCENE,
  name,
  element
});

export const CreateLight = (name, light) => ({
  type: NEW_LIGHT,
  name,
  light
});

export const MoveCameraX = {
  relative (cameraX) {
    return {
      type: CAMERAX_RELATIVE,
      cameraX
    };
  },
  absolute (cameraX) {
    return {
      type: CAMERAX_ABSOLUTE,
      cameraX
    };
  }
};

export const MoveCameraY = {
  relative (cameraY) {
    return {
      type: CAMERAY_RELATIVE,
      cameraY
    };
  },
  absolute (cameraY) {
    return {
      type: CAMERAY_ABSOLUTE,
      cameraY
    };
  }
};

export const MoveCameraZ = {
  relative (cameraZ) {
    return {
      type: CAMERAZ_RELATIVE,
      cameraZ
    };
  },
  absolute (cameraZ) {
    return {
      type: CAMERAZ_ABSOLUTE,
      cameraZ
    };
  }
};

export const Render = () => ({
  type: RENDER
});

export const BuildDefault = () => ({
  type: BUILD_DEFAULT
});

export const DestroyEngine = () => ({
  type: DESTROY_ENGINE
});

export const DestroyCanvas = () => ({
  type: DESTROY_CANVAS
});

const initialState = {
  canvas: null,
  scene: null,
  camera: null,
  renderer: null,
  ready: false,
  cameraX: 0,
  cameraY: 0,
  cameraZ: 0,
  geometries: {},
  elements: {},
  lights: {}
};

export default function reducer (
  state = initialState,
  {
    type,
    canvas,
    scene,
    camera,
    renderer,
    cameraX,
    cameraY,
    cameraZ,
    name,
    geometry,
    element,
    light
  }
) {
  switch (type) {
    case CANVAS:
      return { ...state, canvas };
    case SCENE:
      return { ...state, scene };
    case CAMERA:
      return { ...state, camera };
    case CAMERAX_ABSOLUTE:
      return { ...state, cameraX };
    case CAMERAY_ABSOLUTE:
      return { ...state, cameraY };
    case CAMERAZ_ABSOLUTE:
      return { ...state, cameraZ };
    case CAMERAX_RELATIVE:
      return { ...state, cameraX: state.cameraX + cameraX };
    case CAMERAY_RELATIVE:
      return { ...state, cameraY: state.cameraY + cameraY };
    case CAMERAZ_RELATIVE:
      return { ...state, cameraZ: state.cameraZ + cameraZ };
    case RENDERER:
      return { ...state, renderer };
    case RENDER:
      state.renderer.render(state.scene, state.camera);
      return state;
    case NEW_GEOMETRY:
      return {
        ...state,
        geometries: {
          ...state.geometries,
          [name]: geometry
        }
      };
    case DESTROY_GEOMETRY:
      delete state.geometries[name];
      return { ...state };
    case ADD_TO_SCENE:
      state.scene.add(element);
      return {
        ...state,
        elements: {
          ...state.elements,
          [name]: element
        }
      };
    case NEW_LIGHT:
      return {
        ...state,
        lights: {
          ...state.lights,
          [name]: light
        }
      };
    case BUILD_DEFAULT:
      state.renderer.setPixelRatio(window.devicePixelRatio);
      state.renderer.setSize(window.innerWidth, window.innerHeight);
      return { ...state, cameraZ: 30, ready: true };
    case DESTROY_ENGINE:
      return { ...initialState, canvas: state.canvas };
    case DESTROY_CANVAS:
      return { ...state, canvas: null };
    default:
      return state;
  }
}
