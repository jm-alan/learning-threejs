import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CreateGeometry } from '../../../store/engine/geometries/actions';
import { AddToScene } from '../../../store/engine/scene/actions';

export default function Torus ({
  objectKey, specs, material,
  color, wireframe, initialPosition,
  initialRotation, children
}) {
  children && !Array.isArray(children) && (children = [children]);
  const dispatch = useDispatch();

  const ready = useSelector(state => state.engine.renderer.ready);
  const torus = useSelector(state => state.engine.geometries.all[objectKey]);

  useEffect(() => {
    if (ready && !torus) {
      dispatch(CreateGeometry(
        objectKey,
        'Torus',
        specs,
        material,
        color,
        wireframe,
        initialPosition,
        initialRotation
      ));
    }
  }, [dispatch, objectKey, specs, material, color, wireframe, initialPosition, initialRotation, torus, ready]);

  useEffect(() => {
    if (torus) dispatch(AddToScene(torus));
  }, [dispatch, torus]);

  return children ?? null;
}
