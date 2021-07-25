import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRenderer } from '../../../utils/hooks';
import { RotGeometryX, RotGeometryY, RotGeometryZ } from '../../../store/engine/geometries/actions';

export default function Rotate ({ objectKey, name, rotX = 0, rotY = 0, rotZ = 0 }) {
  const dispatch = useDispatch();

  const renderReady = useSelector(state => state.engine.renderer.ready);
  const objectReady = useSelector(state => state.engine.geometries.all[objectKey]?.ready);
  const renderer = useRenderer();

  useEffect(() => {
    if (renderReady && objectReady) {
      renderer.addFunction(name, () => {
        dispatch(RotGeometryX.relative(objectKey, rotX));
        dispatch(RotGeometryY.relative(objectKey, rotY));
        dispatch(RotGeometryZ.relative(objectKey, rotZ));
      });
    }
    return () => renderer.removeFunction(name);
  }, [dispatch, renderer, renderReady, objectReady, name, objectKey, rotX, rotY, rotZ]);

  return null;
}
