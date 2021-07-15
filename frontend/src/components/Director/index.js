import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CallCamera } from '../../store/engine/cameras/actions';

export default function Director () {
  const dispatch = useDispatch();

  const currentCamera = useSelector(state => state.engine.cameras.current.name);
  const cameraOneReady = useSelector(state => state.engine.cameras.all.cameraOne?.ready);
  const debugEnabled = useSelector(state => state.engine.overlays.debug);

  useEffect(() => {
    if (
      cameraOneReady &&
      (currentCamera !== 'cameraOne') &&
      !debugEnabled
    ) dispatch(CallCamera('cameraOne'));
  }, [dispatch, debugEnabled, currentCamera, cameraOneReady]);

  return null;
}
