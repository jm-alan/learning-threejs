import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AddRenderFunction, RemoveRenderFunction } from '../../store/engine/renderer/actions';
import { MoveCameraX, MoveCameraY, MoveCameraZ } from '../../store/engine/cameras/actions';

export default function Movement () {
  const dispatch = useDispatch();

  const W = useSelector(state => state.engine.keys.pressed.KeyW);
  const A = useSelector(state => state.engine.keys.pressed.KeyA);
  const S = useSelector(state => state.engine.keys.pressed.KeyS);
  const D = useSelector(state => state.engine.keys.pressed.KeyD);
  const ShiftLeft = useSelector(state => state.engine.keys.pressed.ShiftLeft);
  const Space = useSelector(state => state.engine.keys.pressed.Space);
  const calledCamera = useSelector(state => state.engine.cameras.called);

  useEffect(() => {
    if (calledCamera) {
      const moveForward = () => dispatch(MoveCameraZ.relative(calledCamera, -1));
      if (W) dispatch(AddRenderFunction('forward', moveForward));
      if (!W) dispatch(RemoveRenderFunction('forward'));
    }
  }, [dispatch, calledCamera, W]);

  useEffect(() => {
    if (calledCamera) {
      const moveBackward = () => dispatch(MoveCameraZ.relative(calledCamera, 1));
      if (S) dispatch(AddRenderFunction('backward', moveBackward));
      if (!S) dispatch(RemoveRenderFunction('backward'));
    }
  }, [dispatch, calledCamera, S]);

  useEffect(() => {
    if (calledCamera) {
      const moveLeft = () => dispatch(MoveCameraX.relative(calledCamera, -1));
      if (A) dispatch(AddRenderFunction('left', moveLeft));
      if (!A) dispatch(RemoveRenderFunction('left'));
    }
  }, [dispatch, calledCamera, A]);

  useEffect(() => {
    if (calledCamera) {
      const moveRight = () => dispatch(MoveCameraX.relative(calledCamera, 1));
      if (D) dispatch(AddRenderFunction('right', moveRight));
      if (!D) dispatch(RemoveRenderFunction('right'));
    }
  }, [dispatch, calledCamera, D]);

  useEffect(() => {
    if (calledCamera) {
      const moveUp = () => dispatch(MoveCameraY.relative(calledCamera, 1));
      if (Space) dispatch(AddRenderFunction('up', moveUp));
      if (!Space) dispatch(RemoveRenderFunction('up'));
    }
  }, [dispatch, calledCamera, Space]);

  useEffect(() => {
    if (calledCamera) {
      const moveDown = () => dispatch(MoveCameraY.relative(calledCamera, -1));
      if (ShiftLeft) dispatch(AddRenderFunction('down', moveDown));
      if (!ShiftLeft) dispatch(RemoveRenderFunction('down'));
    }
  }, [dispatch, calledCamera, ShiftLeft]);

  return null;
}
