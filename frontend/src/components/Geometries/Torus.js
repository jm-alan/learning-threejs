import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddToScene, CreateGeometry } from '../../store/engine';
import * as Three from 'three';

export default function Torus () {
  const dispatch = useDispatch();

  const ready = useSelector(state => state.engine.ready);
  const testTorus = useSelector(state => state.engine.geometries.testTorus);

  useEffect(() => {
    if (ready && !testTorus) {
      const torusGeometry = new Three.TorusGeometry(10, 3, 16, 100);
      const torusMaterial = new Three.MeshStandardMaterial({ color: 0xFF6347 });
      const torusMesh = new Three.Mesh(torusGeometry, torusMaterial);
      dispatch(CreateGeometry('testTorus', torusMesh));
    }
  }, [dispatch, ready]);

  useEffect(() => {
    if (testTorus) {
      dispatch(AddToScene('testTorus', testTorus));
    }
  }, [dispatch, testTorus]);

  return null;
}
