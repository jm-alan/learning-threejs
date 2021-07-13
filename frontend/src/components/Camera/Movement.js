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
  const currentCamera = useSelector(state => state.engine.cameras.name);

  useEffect(() => {
    if (currentCamera) {
      const moveForward = () => dispatch(MoveCameraZ.relative(currentCamera, -1));
      if (W) dispatch(AddRenderFunction('forward', moveForward));
      if (!W) dispatch(RemoveRenderFunction('forward'));
    }
  }, [dispatch, currentCamera, W]);

  useEffect(() => {
    if (currentCamera) {
      const moveBackward = () => dispatch(MoveCameraZ.relative(currentCamera, 1));
      if (S) dispatch(AddRenderFunction('backward', moveBackward));
      if (!S) dispatch(RemoveRenderFunction('backward'));
    }
  }, [dispatch, currentCamera, S]);

  useEffect(() => {
    if (currentCamera) {
      const moveLeft = () => dispatch(MoveCameraX.relative(currentCamera, -1));
      if (A) dispatch(AddRenderFunction('left', moveLeft));
      if (!A) dispatch(RemoveRenderFunction('left'));
    }
  }, [dispatch, currentCamera, A]);

  useEffect(() => {
    if (currentCamera) {
      const moveRight = () => dispatch(MoveCameraX.relative(currentCamera, 1));
      if (D) dispatch(AddRenderFunction('right', moveRight));
      if (!D) dispatch(RemoveRenderFunction('right'));
    }
  }, [dispatch, currentCamera, D]);

  useEffect(() => {
    if (currentCamera) {
      const moveUp = () => dispatch(MoveCameraY.relative(currentCamera, 1));
      if (Space) dispatch(AddRenderFunction('up', moveUp));
      if (!Space) dispatch(RemoveRenderFunction('up'));
    }
  }, [dispatch, currentCamera, Space]);

  useEffect(() => {
    if (currentCamera) {
      const moveDown = () => dispatch(MoveCameraY.relative(currentCamera, -1));
      if (ShiftLeft) dispatch(AddRenderFunction('down', moveDown));
      if (!ShiftLeft) dispatch(RemoveRenderFunction('down'));
    }
  }, [dispatch, currentCamera, ShiftLeft]);

  return null;
}
