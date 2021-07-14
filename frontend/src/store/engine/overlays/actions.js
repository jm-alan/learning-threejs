import * as types from './types';

export const ShowDebugMenu = () => ({
  type: types.SHOW_DEBUG
});

export const HideDebugMenu = () => ({
  type: types.HIDE_DEBUG
});

export const SetOverlayMooring = mooring => ({
  type: types.MOORING,
  mooring
});

export const AddOverlay = (name, component) => ({
  type: types.ADD,
  name,
  component
});

export const RemoveOverlay = name => ({
  type: types.REMOVE,
  name
});
