import * as types from './types';

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
    case types.CANVAS:
      return { ...state, canvas };
    case types.SCENE:
      return { ...state, scene };
    case types.CAMERA:
      return { ...state, camera };
    case types.CAMERAX_ABSOLUTE:
      return { ...state, cameraX };
    case types.CAMERAY_ABSOLUTE:
      return { ...state, cameraY };
    case types.CAMERAZ_ABSOLUTE:
      return { ...state, cameraZ };
    case types.CAMERAX_RELATIVE:
      return { ...state, cameraX: state.cameraX + cameraX };
    case types.CAMERAY_RELATIVE:
      return { ...state, cameraY: state.cameraY + cameraY };
    case types.CAMERAZ_RELATIVE:
      return { ...state, cameraZ: state.cameraZ + cameraZ };
    case types.RENDERER:
      return { ...state, renderer };
    case types.RENDER:
      state.renderer.render(state.scene, state.camera);
      return state;
    case types.NEW_GEOMETRY:
      return {
        ...state,
        geometries: {
          ...state.geometries,
          [name]: geometry
        }
      };
    case types.DESTROY_GEOMETRY:
      delete state.geometries[name];
      return { ...state };
    case types.ADD_TO_SCENE:
      state.scene.add(element);
      return {
        ...state,
        elements: {
          ...state.elements,
          [name]: element
        }
      };
    case types.NEW_LIGHT:
      return {
        ...state,
        lights: {
          ...state.lights,
          [name]: light
        }
      };
    case types.BUILD_DEFAULT:
      state.renderer.setPixelRatio(window.devicePixelRatio);
      state.renderer.setSize(window.innerWidth, window.innerHeight);
      return { ...state, cameraZ: 30, ready: true };
    case types.DESTROY_ENGINE:
      return { ...initialState, canvas: state.canvas };
    case types.DESTROY_CANVAS:
      return { ...state, canvas: null };
    default:
      return state;
  }
}
