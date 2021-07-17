import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CallCamera } from '../../store/engine/cameras/actions';
import { CallScene } from '../../store/engine/scenes/actions';

export default function Director ({ children, cameras, scenes }) {
  const dispatch = useDispatch();

  const calledCamera = useSelector(state => state.engine.cameras.current.name);
  const cameraOneReady = useSelector(state => state.engine.cameras.all.cameraOne?.ready);
  const sceneMain = useSelector(state => state.engine.scenes.all.main);
  const calledScene = useSelector(state => state.engine.scenes.called);
  const debugEnabled = useSelector(state => state.engine.overlays.debug);

  useEffect(() => {
    if (
      cameraOneReady &&
      (calledCamera !== 'cameraOne') &&
      !debugEnabled
    ) dispatch(CallCamera('cameraOne'));
  }, [dispatch, debugEnabled, calledCamera, cameraOneReady]);

  useEffect(() => {
    if (
      sceneMain &&
      calledScene !== 'main' &&
      !debugEnabled
    ) dispatch(CallScene('main'));
  }, [dispatch, sceneMain, calledScene, debugEnabled]);

  return children;
}
