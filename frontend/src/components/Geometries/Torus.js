import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateGeometry } from '../../store/engine/geometries/actions';
import { AddToScene } from '../../store/engine/scene/actions';

export default function Torus () {
  const dispatch = useDispatch();

  const ready = useSelector(state => state.engine.renderer.ready);
  const testTorus = useSelector(state => state.engine.geometries.all.testTorus?.mesh);

  useEffect(() => {
    if (ready && !testTorus) {
      dispatch(CreateGeometry(
        'testTorus',
        'Torus',
        [20, 3, 16, 100],
        'MeshStandard'
      ));
    }
  }, [dispatch, testTorus, ready]);

  useEffect(() => {
    if (testTorus) dispatch(AddToScene(testTorus));
  }, [dispatch, testTorus]);

  return null;
}
