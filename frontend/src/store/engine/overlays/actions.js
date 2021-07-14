import * as types from './types';

export const ShowDebugMenu = () => ({
  type: types.SHOW_DEBUG
});

export const HideDebugMenu = () => ({
  type: types.HIDE_DEBUG
});

export const SetOverlayMooring = mooring => ({
  type: types.MOORING
});
