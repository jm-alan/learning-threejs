import * as types from './types';

export const ReadyRenderer = () => ({
  type: types.READY
});

export const UnreadyRenderer = () => ({
  type: types.UNREADY
});

export const PauseRender = () => ({
  type: types.PAUSE
});

export const ResumeRender = () => ({
  type: types.UNPAUSE
});
