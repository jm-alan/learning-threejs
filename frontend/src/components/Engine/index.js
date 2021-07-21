import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BuildDefault, CreateRenderer, DestroyRenderer } from '../../store/engine/renderer/actions';
import { useEventListener } from '../../utils/hooks';

export default function Engine ({ children }) {
  const dispatch = useDispatch();

  const ready = useSelector(state => state.engine.renderer.ready);
  const canvas = useSelector(state => state.engine.canvas.current);
  const paused = useSelector(state => state.engine.renderer.paused);
  const renderer = useSelector(state => state.engine.renderer.current);
  const scene = useSelector(state => state.engine.scenes.current.object);
  const camera = useSelector(state => state.engine.cameras.current.object);
  const renderFunctions = useSelector(state => state.engine.renderer.functions);
  const renderKeys = useSelector(state => state.engine.renderer.keys);

  const timeRef = useRef(null);
  const pausedRef = useRef(false);

  const [add, remove] = useEventListener(window);

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    canvas && dispatch(CreateRenderer(canvas));
    return () => dispatch(DestroyRenderer());
  }, [dispatch, canvas]);

  useEffect(() => {
    const fitToWindow = () => scene && camera && renderer && dispatch(BuildDefault());
    fitToWindow();
    add.resize(fitToWindow);
    return () => remove.resize(fitToWindow);
  }, [dispatch, add, remove, scene, camera, canvas, renderer]);

  useEffect(() => {
    const animate = t => {
      if (ready && !pausedRef.current) {
        for (let i = 0; i < renderKeys.length; i++) {
          (t - timeRef.current > 16.65) && renderFunctions[renderKeys[i]] && renderFunctions[renderKeys[i]]();
        }
        timeRef.current = t;
        renderer.render(scene, camera);
        window.requestAnimationFrame(animate);
      }
    };
    window.requestAnimationFrame(animate);
  }, [renderKeys, scene, camera, ready, renderer, renderFunctions]);

  return children;
}
