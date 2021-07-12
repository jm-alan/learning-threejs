import { combineReducers } from 'redux';

import canvas from './canvas';
import scene from './scene';
import camera from './camera';
import renderer from './renderer';
import geometries from './geometries';
import pointLights from './pointLights';
import keys from './keys';

export default combineReducers({
  canvas,
  scene,
  camera,
  renderer,
  geometries,
  pointLights,
  keys
});
