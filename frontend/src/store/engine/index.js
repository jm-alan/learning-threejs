import { combineReducers } from 'redux';

import canvas from './canvas';
import scene from './scene';
import cameras from './cameras';
import renderer from './renderer';
import geometries from './geometries';
import pointLights from './pointLights';
import keys from './keys';

export default combineReducers({
  canvas,
  scene,
  cameras,
  renderer,
  geometries,
  pointLights,
  keys
});
