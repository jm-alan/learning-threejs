import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RotGeometryX, RotGeometryY, RotGeometryZ } from '../../../store/engine/geometries/actions';

import { AddRenderFunction, RemoveRenderFunction } from '../../../store/engine/renderer/actions';

export default function Rotate ({ objectKey, name, rotX = 0, rotY = 0, rotZ = 0 }) {
  const dispatch = useDispatch();

  const objectReady = useSelector(state => state.engine.geometries.all[objectKey]?.ready);

  useEffect(() => {
    if (objectReady) {
      dispatch(AddRenderFunction(name, () => {
        dispatch(RotGeometryX.relative(objectKey, rotX));
        dispatch(RotGeometryY.relative(objectKey, rotY));
        dispatch(RotGeometryZ.relative(objectKey, rotZ));
      }));
    }
    return () => dispatch(RemoveRenderFunction(name));
  }, [dispatch, objectReady, name, objectKey, rotX, rotY, rotZ]);

  return null;
}
