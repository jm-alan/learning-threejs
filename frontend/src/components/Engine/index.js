import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BuildDefault, CreateRenderer, DestroyRenderer } from '../../store/engine/renderer/actions';

export default function Engine ({ children }) {
  const dispatch = useDispatch();

  const ready = useSelector(state => state.engine.renderer.ready);
  const canvas = useSelector(state => state.engine.canvas.current);
  const renderer = useSelector(state => state.engine.renderer.current);
  const scene = useSelector(state => state.engine.scenes.current.object);
  const camera = useSelector(state => state.engine.cameras.current.object);
  const renderObjects = useSelector(state => state.engine.renderer.functions);
  const paused = useSelector(state => state.engine.renderer.paused);

  useEffect(() => {
    if (canvas) {
      dispatch(CreateRenderer(canvas));
    }
    return () => {
      dispatch(DestroyRenderer());
    };
  }, [dispatch, canvas]);

  useEffect(() => {
    if (scene && camera && renderer) {
      dispatch(BuildDefault());
    }
  }, [dispatch, scene, camera, canvas, renderer]);

  useEffect(() => {
    const animate = () => {
      if (ready && !paused) {
        renderer.render(scene, camera);
        for (let i = 0; i < renderObjects.length; i++) renderObjects[i].action();
        return window.requestAnimationFrame(animate);
      }
    };
    const captureFrame = animate();
    return () => window.cancelAnimationFrame(captureFrame);
  }, [dispatch, scene, camera, ready, renderer, renderObjects, paused]);

  return children;
}
