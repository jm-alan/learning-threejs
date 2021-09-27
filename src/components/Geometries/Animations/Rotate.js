import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useRenderer } from '../../../utils/hooks';

export default function Rotate ({ objectKey, name, rotX = 0, rotY = 0, rotZ = 0 }) {
  const dispatch = useDispatch();

  const renderReady = useSelector(state => state.engine.renderer.ready);
  const object = useSelector(state => state.engine.geometries.all[objectKey]?.object);
  const objectReady = useSelector(state => state.engine.geometries.all[objectKey]?.ready);
  const renderer = useRenderer();

  useEffect(() => {
    if (renderReady && objectReady) {
      renderer.addFunction(name, () => {
        object.rotation.x += rotX;
        object.rotation.y += rotY;
        object.rotation.z += rotZ;
      });
    }
    return () => renderer.removeFunction(name);
  }, [dispatch, object, renderer, renderReady, objectReady, name, objectKey, rotX, rotY, rotZ]);

  return null;
}
