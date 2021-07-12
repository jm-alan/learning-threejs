import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateGeometry } from '../../store/engine/geometries/actions';
import { AddToScene } from '../../store/engine/scene/actions';

export default function Torus ({ key, specs, material, color, wireframe, initialPosition, initialRotation }) {
  const dispatch = useDispatch();

  const ready = useSelector(state => state.engine.renderer.ready);
  const object = useSelector(state => state.engine.geometries.all[key]);

  useEffect(() => {
    if (ready && !object) {
      dispatch(CreateGeometry(
        key,
        'Torus',
        specs,
        material,
        color,
        wireframe,
        initialPosition,
        initialRotation
      ));
    }
  }, [dispatch, object, ready]);

  useEffect(() => {
    if (object) dispatch(AddToScene(object));
  }, [dispatch, object]);

  return null;
}
