import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CreatePerspectiveCamera } from '../../store/engine/camera/actions';

export default function Camera () {
  const dispatch = useDispatch();

  const camera = useSelector(state => state.engine.camera.current);

  useEffect(() => {
    if (!camera) dispatch(CreatePerspectiveCamera());
  }, [dispatch, camera]);

  return null;
}
