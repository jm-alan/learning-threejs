import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { MoveCameraX, MoveCameraY, MoveCameraZ } from '../../store/engine/cameras/actions';
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
  const calledCamera = useSelector(state => state.engine.cameras.called);

  const renderer = useRenderer();

  useEffect(() => {
    if (ready && calledCamera) {
      const moveForward = () => dispatch(MoveCameraZ.relative(calledCamera, -1));
      if (W) renderer.addFunction('forward', moveForward);
      if (!W) renderer.removeFunction('forward');
    }
  }, [dispatch, ready, calledCamera, W]);

  useEffect(() => {
    if (ready && calledCamera) {
      const moveBackward = () => dispatch(MoveCameraZ.relative(calledCamera, 1));
      if (S) renderer.addFunction('backward', moveBackward);
      if (!S) renderer.removeFunction('backward');
    }
  }, [dispatch, ready, calledCamera, S]);

  useEffect(() => {
    if (ready && calledCamera) {
      const moveLeft = () => dispatch(MoveCameraX.relative(calledCamera, -1));
      if (A) renderer.addFunction('left', moveLeft);
      if (!A) renderer.removeFunction('left');
    }
  }, [dispatch, ready, calledCamera, A]);

  useEffect(() => {
    if (ready && calledCamera) {
      const moveRight = () => dispatch(MoveCameraX.relative(calledCamera, 1));
      if (D) renderer.addFunction('right', moveRight);
      if (!D) renderer.removeFunction('right');
    }
  }, [dispatch, ready, calledCamera, D]);

  useEffect(() => {
    if (ready && calledCamera) {
      const moveUp = () => dispatch(MoveCameraY.relative(calledCamera, 1));
      if (Space) renderer.addFunction('up', moveUp);
      if (!Space) renderer.removeFunction('up');
    }
  }, [dispatch, ready, calledCamera, Space]);

  useEffect(() => {
    if (ready && calledCamera) {
      const moveDown = () => dispatch(MoveCameraY.relative(calledCamera, -1));
      if (ShiftLeft) renderer.addFunction('down', moveDown);
      if (!ShiftLeft) renderer.removeFunction('down');
    }
  }, [dispatch, ready, calledCamera, ShiftLeft]);

  return null;
}
