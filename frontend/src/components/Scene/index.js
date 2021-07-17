import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CreateScene, DestroyScene, SetScene } from '../../store/engine/scenes/actions';

export default function Scene ({ children, name }) {
  const dispatch = useDispatch();

  const object = useSelector(state => state.engine.scenes.all[name]);
  const currentScene = useSelector(state => state.engine.scenes.current.name);
  const calledScene = useSelector(state => state.engine.scenes.called);

  useEffect(() => {
    !object && dispatch(CreateScene(name));
    return () => object && dispatch(DestroyScene(name));
  }, [dispatch, object, name]);

  useEffect(() => {
    calledScene === name &&
    currentScene !== name &&
    dispatch(SetScene(name));
  }, [dispatch, name, currentScene, calledScene]);

  return children(name);
}
