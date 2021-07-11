const CANVAS = 'engine/CANVAS';
const SCENE = 'engine/SCENE';
const CAMERA = 'engine/CAMERA';
const RENDERER = 'engine/RENDERER';
const DESTROY = 'engine/DESTROY';

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
    case DESTROY:
      return initialState;
    default:
      return state;
  }
}
