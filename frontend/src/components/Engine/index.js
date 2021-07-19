import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { BuildDefault, CreateRenderer, DestroyRenderer, MarkFunctionsUnchanged } from '../../store/engine/renderer/actions';

export default function Engine ({ children }) {
  const dispatch = useDispatch();

  const ready = useSelector(state => state.engine.renderer.ready);
  const canvas = useSelector(state => state.engine.canvas.current);
  const renderer = useSelector(state => state.engine.renderer.current);
  const scene = useSelector(state => state.engine.scenes.current.object);
  const camera = useSelector(state => state.engine.cameras.current.object);
  const renderObjects = useSelector(state => state.engine.renderer.functions);
  const paused = useSelector(state => state.engine.renderer.paused);
  const functionsChanged = useSelector(state => state.engine.renderer.changed);

  const renderProps = useRef({ paused: false });
  const renderKeys = useRef([]);

  useEffect(() => {
    renderProps.current.paused = paused;
  }, [paused]);

  useEffect(() => {
    if (functionsChanged) {
      renderKeys.current = Object.keys(renderObjects);
    }
    dispatch(MarkFunctionsUnchanged());
  }, [dispatch, functionsChanged, renderObjects]);

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
    console.log('=================================');
    console.log('=================================');
    console.log('=================================');
    console.log('=================================');
    console.log('=================================');
    console.log(renderKeys.current, renderObjects);
    console.log('=================================');
    console.log('=================================');
    console.log('=================================');
    console.log('=================================');
    console.log('=================================');
    const animate = () => {
      if (ready && !renderProps.current.paused) {
        renderer.render(scene, camera);
        for (let i = 0; i < renderKeys.current.length; i++) renderObjects[renderKeys.current[i]]();
        return window.requestAnimationFrame(animate);
      }
    };
    const captureFrame = window.requestAnimationFrame(animate);
    return () => window.cancelAnimationFrame(captureFrame);
  }, [dispatch, scene, camera, ready, renderer, renderObjects, paused]);

  return children;
}
