import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { AddRenderFunction, RemoveRenderFunction } from '../../store/engine/renderer/actions';
import { MoveCameraX, MoveCameraY, MoveCameraZ } from '../../store/engine/camera/actions';

export default function Movement () {
  const dispatch = useDispatch();

  const W = useSelector(state => state.engine.keys.pressed.KeyW);
  const A = useSelector(state => state.engine.keys.pressed.KeyA);
  const S = useSelector(state => state.engine.keys.pressed.KeyS);
  const D = useSelector(state => state.engine.keys.pressed.KeyD);
  const ShiftLeft = useSelector(state => state.engine.keys.pressed.ShiftLeft);
  const Space = useSelector(state => state.engine.keys.pressed.Space);

  useEffect(() => {
    const moveForward = () => dispatch(MoveCameraZ.relative(-1));
    if (W) dispatch(AddRenderFunction('forward', moveForward));
    if (!W) dispatch(RemoveRenderFunction('forward'));
  }, [dispatch, W]);

  useEffect(() => {
    const moveBackward = () => dispatch(MoveCameraZ.relative(1));
    if (S) dispatch(AddRenderFunction('backward', moveBackward));
    if (!S) dispatch(RemoveRenderFunction('backward'));
  }, [dispatch, S]);

  useEffect(() => {
    const moveLeft = () => dispatch(MoveCameraX.relative(-1));
    if (A) dispatch(AddRenderFunction('left', moveLeft));
    if (!A) dispatch(RemoveRenderFunction('left'));
  }, [dispatch, A]);

  useEffect(() => {
    const moveRight = () => dispatch(MoveCameraX.relative(1));
    if (D) dispatch(AddRenderFunction('right', moveRight));
    if (!D) dispatch(RemoveRenderFunction('right'));
  }, [dispatch, D]);

  useEffect(() => {
    const moveUp = () => {
      dispatch(MoveCameraY.relative(1));
    };
    if (Space) dispatch(AddRenderFunction('up', moveUp));
    if (!Space) dispatch(RemoveRenderFunction('up'));
  }, [dispatch, Space]);

  useEffect(() => {
    const moveDown = () => {
      dispatch(MoveCameraY.relative(-1));
    };
    if (ShiftLeft) dispatch(AddRenderFunction('down', moveDown));
    if (!ShiftLeft) dispatch(RemoveRenderFunction('down'));
  }, [dispatch, ShiftLeft]);

  return null;
}
