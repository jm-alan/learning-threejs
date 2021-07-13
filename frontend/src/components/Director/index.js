import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CallCamera } from '../../store/engine/cameras/actions';

export default function Director () {
  const dispatch = useDispatch();

  const cameraOneReady = useSelector(state => state.engine.cameras.all.cameraOne?.ready);
  const currentCamera = useSelector(state => state.engine.cameras.current.name);

  useEffect(() => {
    if (cameraOneReady && (currentCamera !== 'cameraOne')) dispatch(CallCamera('cameraOne'));
  }, [dispatch, currentCamera, cameraOneReady]);

  return null;
}
