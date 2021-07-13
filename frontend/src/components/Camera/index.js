import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  CreatePerspectiveCamera,
  DestroyPerspectiveCamera,
  ReadyCamera,
  ReadyCameraPos,
  ReadyCameraRot,
  SetCamera
} from '../../store/engine/cameras/actions';

export default function Camera () {
  const dispatch = useDispatch();

  const camera = useSelector(state => state.engine.camera.current);

  useEffect(() => {
    if (!camera) dispatch(CreatePerspectiveCamera());
  }, [dispatch, camera]);

  return null;
}
