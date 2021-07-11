import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateGeometry } from '../../store/engine/actions';

export default function Torus () {
  const dispatch = useDispatch();

  const ready = useSelector(state => state.engine.ready);
  const testTorus = useSelector(state => state.engine.geometries.testTorus);

  useEffect(() => {
    if (ready && !testTorus) {
      dispatch(CreateGeometry(
        'testTorus',
        'Torus',
        [20, 3, 16, 100],
        'MeshBasic'
      ));
    }
  }, [dispatch, testTorus, ready]);

  return null;
}
