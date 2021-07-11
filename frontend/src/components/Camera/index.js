import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Three from 'three';

import { SetCamera } from '../../store/engine/actions';

export default function Camera () {
  const dispatch = useDispatch();

  const camera = useSelector(state => state.engine.camera);

  useEffect(() => {
    if (!camera) {
      dispatch(SetCamera(
        new Three.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        )
      ));
    }
  }, [dispatch, camera]);

  return null;
}
