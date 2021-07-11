const CANVAS = 'engine/CANVAS';
const SCENE = 'engine/SCENE';
const CAMERA = 'engine/CAMERA';
const RENDERER = 'engine/RENDERER';
const DESTROY = 'engine/DESTROY';
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

export const DestroyEngine = () => ({
  type: DESTROY
});

export const BuildDefault = () => ({
  type: BUILD_DEFAULT
});

const initialState = { canvas: null, scene: null, camera: null, renderer: null };

export default function reducer (
  state = initialState,
  { type, canvas, scene, camera, renderer }
) {
  switch (type) {
    case CANVAS:
      return { ...state, canvas };
    case SCENE:
      return { ...state, scene };
    case CAMERA:
      return { ...state, camera };
    case RENDERER:
      return { ...state, renderer };
    case BUILD_DEFAULT:
      state.renderer.setPixelRatio(window.devicePixelRatio);
      state.renderer.setSize(window.innerWidth, window.innerHeight);
      break;
    case DESTROY:
      return initialState;
    default:
      return state;
  }
}
