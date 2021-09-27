import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { useRenderer } from '../../utils/hooks';

export default function Movement () {
  const dispatch = useDispatch();

  const ready = useSelector(state => state.engine.renderer.ready);
  const W = useSelector(state => state.engine.keys.pressed.KeyW);
  const A = useSelector(state => state.engine.keys.pressed.KeyA);
  const S = useSelector(state => state.engine.keys.pressed.KeyS);
  const D = useSelector(state => state.engine.keys.pressed.KeyD);
  const ShiftLeft = useSelector(state => state.engine.keys.pressed.ShiftLeft);
  const Space = useSelector(state => state.engine.keys.pressed.Space);
  const camera = useSelector(state => state.engine.cameras.current.object);

  const renderer = useRenderer();

  useEffect(() => {
    if (ready && camera) {
      const moveForward = () => (camera.position.z -= 1);
      if (W) renderer.addFunction('forward', moveForward);
    }
    if (!W) renderer.removeFunction('forward');
  }, [dispatch, renderer, ready, camera, W]);

  useEffect(() => {
    if (ready && camera) {
      const moveBackward = () => (camera.position.z += 1);
      if (S) renderer.addFunction('backward', moveBackward);
    }
    if (!S) renderer.removeFunction('backward');
  }, [dispatch, renderer, ready, camera, S]);

  useEffect(() => {
    if (ready && camera) {
      const moveLeft = () => (camera.position.x -= 1);
      if (A) renderer.addFunction('left', moveLeft);
    }
    if (!A) renderer.removeFunction('left');
  }, [dispatch, renderer, ready, camera, A]);

  useEffect(() => {
    if (ready && camera) {
      const moveRight = () => (camera.position.x += 1);
      if (D) renderer.addFunction('right', moveRight);
    }
    if (!D) renderer.removeFunction('right');
  }, [dispatch, renderer, ready, camera, D]);

  useEffect(() => {
    if (ready && camera) {
      const moveUp = () => (camera.position.y += 1);
      if (Space) renderer.addFunction('up', moveUp);
    }
    if (!Space) renderer.removeFunction('up');
  }, [dispatch, renderer, ready, camera, Space]);

  useEffect(() => {
    if (ready && camera) {
      const moveDown = () => (camera.position.y -= 1);
      if (ShiftLeft) renderer.addFunction('down', moveDown);
    }
    if (!ShiftLeft) renderer.removeFunction('down');
  }, [dispatch, renderer, ready, camera, ShiftLeft]);

  return null;
}
