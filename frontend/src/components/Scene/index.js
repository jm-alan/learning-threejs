import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CreateScene, DestroyScene } from '../../store/engine/scenes/actions';

export default function Scene ({ children, name }) {
  const dispatch = useDispatch();

  const object = useSelector(state => state.engine.scenes.all[name]);

  useEffect(() => {
    if (!object) dispatch(CreateScene(name));
    return () => dispatch(DestroyScene(name));
  }, [dispatch, object, name]);

  children(name);
  return null;
}
