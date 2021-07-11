import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as Three from 'three';
import { BuildDefault, DestroyEngine, Render, SetCamera, SetRenderer, SetScene } from '../../store/engine';

export default function Engine () {
  const dispatch = useDispatch();

  const canvas = useSelector(state => state.engine.canvas);
  const renderer = useSelector(state => state.engine.renderer);
  const scene = useSelector(state => state.engine.scene);
  const camera = useSelector(state => state.engine.camera);
  const cameraX = useSelector(state => state.engine.cameraX);
  const cameraY = useSelector(state => state.engine.cameraY);
  const cameraZ = useSelector(state => state.engine.cameraZ);

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

  useEffect(() => {
    if (renderer && scene && camera) dispatch(Render());
  }, [dispatch, renderer, scene, camera]);

  useEffect(() => {
    if (camera) {
      camera.position.setX(cameraX);
      camera.position.setY(cameraY);
      camera.position.setZ(cameraZ);
    }
  }, [dispatch, camera, cameraX, cameraY, cameraZ]);

  return null;
}
