const CANVAS = 'engine/CANVAS';
const SCENE = 'engine/SCENE';
const CAMERA = 'engine/CAMERA';
const RENDERER = 'engine/RENDERER';

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

export default function reducer (
  state = { mooring: null },
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
    default:
      return state;
  }
}
