import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useEventListener, useRenderer } from '../../utils/hooks';

export default function Engine ({ children }) {
  const dispatch = useDispatch();

  const ready = useSelector(state => state.engine.renderer.ready);
  const canvas = useSelector(state => state.engine.canvas.current);
  const paused = useSelector(state => state.engine.renderer.paused);
  const scene = useSelector(state => state.engine.scenes.current.object);
  const camera = useSelector(state => state.engine.cameras.current.object);
  const visibilityKeys = useSelector(state => state.engine.cameras.keys);
  const visibilityFunctions = useSelector(state => state.engine.cameras.functions);

  const renderTimeRef = useRef(0);
  const cameraTimeRef = useRef(0);
  const pausedRef = useRef(false);

  const [add, remove] = useEventListener(window);

  const renderer = useRenderer();

  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    !ready && renderer.captureDispatch(dispatch);
  }, [dispatch, renderer, ready]);

  useEffect(() => {
    canvas && !ready && renderer.build(canvas);
  }, [canvas, ready]);

  useEffect(() => {
    const fitToWindow = () => scene && camera && ready && renderer.resize();
    fitToWindow();
    add.resize(fitToWindow);
    return () => remove.resize(fitToWindow);
  }, [add, remove, scene, camera, ready]);

  useEffect(() => {
    const runRender = t => {
      for (let i = 0; i < renderer.keys.length; i++) {
        renderer.functions[renderer.keys[i]] && renderer.functions[renderer.keys[i]]();
      }
      renderTimeRef.current = t;
      renderer.render(scene, camera);
    };
    const checkVisibility = t => {
      for (let i = 0; i < visibilityKeys.length; i++) {
        visibilityFunctions[visibilityKeys[i]] && visibilityFunctions[visibilityKeys[i]](
          camera.position.x,
          camera.position.y,
          camera.position.z
        );
      }
      cameraTimeRef.current = t;
    };
    const timerFunctions = t => {
      t - renderTimeRef.current > 16.64 && runRender(t);
      t - cameraTimeRef.current >= 100 && checkVisibility(t);
    };
    const runEngine = t => {
      ready && !pausedRef.current && timerFunctions(t);
      window.requestAnimationFrame(runEngine);
    };
    window.requestAnimationFrame(runEngine);
  }, [scene, camera, ready, renderer, renderer.keys, renderer.functions, visibilityKeys, visibilityFunctions]);

  useEffect(() => renderer.destroy(), []);

  return children;
}
