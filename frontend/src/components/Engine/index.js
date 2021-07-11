import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Three from 'three';
import { BuildDefault, DestroyEngine, SetCamera, SetRenderer, SetScene } from '../../store/engine';

export default function Engine () {
  const dispatch = useDispatch();

  const canvas = useSelector(state => state.engine.canvas);
  const renderer = useSelector(state => state.engine.renderer);

  useEffect(() => {
    if (canvas) {
      dispatch(SetScene(new Three.Scene()));
      dispatch(SetCamera(
        new Three.PerspectiveCamera(
          75,
          window.innerWidth / window.innerHeight,
          0.1,
          1000
        )
      ));
      dispatch(SetRenderer(new Three.WebGLRenderer({ canvas })));
    }
    return () => dispatch(DestroyEngine());
  }, [dispatch, canvas]);

  useEffect(() => {
    if (renderer) {
      dispatch(BuildDefault());
    }
  }, [dispatch, renderer]);

  return null;
}
