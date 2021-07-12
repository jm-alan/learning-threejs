import * as types from './types';

export const PressKey = key => ({
  type: types.PRESS,
  key
});

export const ReleaseKey = key => ({
  type: types.RELEASE,
  key
});
