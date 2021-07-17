import { combineReducers } from 'redux';

import canvas from './canvas';
import scenes from './scenes';
import cameras from './cameras';
import renderer from './renderer';
import geometries from './geometries';
import pointLights from './pointLights';
import keys from './keys';
import mode from './mode';
import overlays from './overlays';

export default combineReducers({
  canvas,
  scenes,
  cameras,
  renderer,
  geometries,
  pointLights,
  keys,
  mode,
  overlays
});
