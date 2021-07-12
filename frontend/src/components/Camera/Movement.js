import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  AddRenderFunction,
  MoveCameraX,
  MoveCameraY,
  MoveCameraZ,
  RemoveRenderFunction
} from '../../store/engine/actions';

export default function Movement () {
  const dispatch = useDispatch();

  const W = useSelector(state => state.engine.keys.KeyW);
  const A = useSelector(state => state.engine.keys.KeyA);
  const S = useSelector(state => state.engine.keys.KeyS);
  const D = useSelector(state => state.engine.keys.KeyD);
  const ControlLeft = useSelector(state => state.engine.keys.ControlLeft);
  const Space = useSelector(state => state.engine.keys.Space);

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
    const moveUp = () => dispatch(MoveCameraY.relative(1));
    if (Space) dispatch(AddRenderFunction('up', moveUp));
    if (!Space) dispatch(RemoveRenderFunction('up'));
  }, [dispatch, Space]);

  useEffect(() => {
    const moveDown = () => dispatch(MoveCameraY.relative(-1));
    if (ControlLeft) dispatch(AddRenderFunction('down', moveDown));
    if (!ControlLeft) dispatch(RemoveRenderFunction('down'));
  }, [dispatch, ControlLeft]);

  return null;
}
