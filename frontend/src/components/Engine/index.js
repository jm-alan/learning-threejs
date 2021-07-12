import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Three from 'three';
import {
  BuildDefault,
  DestroyEngine,
  MoveCameraZ,
  Render,
  // SetCamera,
  // SetLightColor,
  SetRenderer,
  SetScene
} from '../../store/engine/actions';

export default function Engine ({ children }) {
  const dispatch = useDispatch();

  const ready = useSelector(state => state.engine.ready);
  const canvas = useSelector(state => state.engine.canvas);
  const renderer = useSelector(state => state.engine.renderer);
  const scene = useSelector(state => state.engine.scene);
  const camera = useSelector(state => state.engine.camera);
  const renderObjects = useSelector(state => state.engine.renderObjects);
  // const pointOne = useSelector(state => state.engine.pointLights.pointOne?.light);
  // const pointTwo = useSelector(state => state.engine.pointLights.pointTwo?.light);
  // const pointThree = useSelector(state => state.engine.pointLights.pointThree?.light);
  // const pointFour = useSelector(state => state.engine.pointLights.pointFour?.light);

  useEffect(() => {
    if (canvas) {
      dispatch(SetScene(new Three.Scene()));
      dispatch(SetRenderer(new Three.WebGLRenderer({ canvas })));
    }
    return () => dispatch(DestroyEngine());
  }, [dispatch, canvas]);

  useEffect(() => {
    if (canvas && scene && camera && renderer && !ready) {
      dispatch(BuildDefault());
      dispatch(MoveCameraZ.absolute(30));
    }
  }, [dispatch, scene, camera, canvas, renderer, ready]);

  useEffect(() => {
    const animate = () => {
      if (ready) {
        dispatch(Render());
        for (const renderObj of renderObjects) renderObj.action();
      }
      return window.requestAnimationFrame(animate);
    };
    const captureFrame = animate();
    return () => window.cancelAnimationFrame(captureFrame);
  }, [dispatch, ready, renderObjects]);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (pointOne) dispatch(SetLightColor('pointLight', 'pointOne', Math.round(Math.random() * 0xFFFFFF)));
  //     if (pointTwo) dispatch(SetLightColor('pointLight', 'pointTwo', Math.round(Math.random() * 0xFFFFFF)));
  //     if (pointThree) dispatch(SetLightColor('pointLight', 'pointThree', Math.round(Math.random() * 0xFFFFFF)));
  //     if (pointFour) dispatch(SetLightColor('pointLight', 'pointFour', Math.round(Math.random() * 0xFFFFFF)));
  //   }, 100);
  //   return () => clearInterval(interval);
  // }, [dispatch, pointOne, pointTwo, pointThree, pointFour]);

  return children;
}
