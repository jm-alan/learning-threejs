import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  CreatePerspectiveCamera,
  DestroyPerspectiveCamera,
  ReadyCamera,
  ReadyCameraPos,
  ReadyCameraRot,
  SetCamera
} from '../../store/engine/cameras/actions';

export default function Camera ({
  objectKey, FOV, frustNear,
  frustFar, initialPosition, initialRotation
}) {
  const dispatch = useDispatch();

  const calledCamera = useSelector(state => state.engine.cameras.called);
  const currentCamera = useSelector(state => state.engine.cameras.current.name);
  const ready = useSelector(state => state.engine.cameras.all[objectKey]?.ready);
  const object = useSelector(state => state.engine.cameras.all[objectKey]?.object);
  const readyPos = useSelector(state => state.engine.cameras.all[objectKey]?.readyPos);
  const readyRot = useSelector(state => state.engine.cameras.all[objectKey]?.readyRot);
  const posX = useSelector(state => state.engine.cameras.all[objectKey]?.posX);
  const posY = useSelector(state => state.engine.cameras.all[objectKey]?.posY);
  const posZ = useSelector(state => state.engine.cameras.all[objectKey]?.posZ);
  const rotX = useSelector(state => state.engine.cameras.all[objectKey]?.rotX);
  const rotY = useSelector(state => state.engine.cameras.all[objectKey]?.rotY);
  const rotZ = useSelector(state => state.engine.cameras.all[objectKey]?.rotZ);

  useEffect(() => {
    dispatch(CreatePerspectiveCamera(
      objectKey,
      FOV,
      frustNear,
      frustFar,
      initialPosition,
      initialRotation
    ));
    return () => dispatch(DestroyPerspectiveCamera(objectKey));
  }, [dispatch, objectKey, FOV, frustNear, frustFar, initialPosition, initialRotation]);

  useEffect(() => {
    object && object.position.setX(posX);
  }, [object, posX]);

  useEffect(() => {
    object && object.position.setY(posY);
  }, [object, posY]);

  useEffect(() => {
    object && object.position.setZ(posZ);
  }, [object, posZ]);

  useEffect(() => {
    object && object.rotateX(rotX);
  }, [object, rotX]);

  useEffect(() => {
    object && object.rotateY(rotY);
  }, [object, rotY]);

  useEffect(() => {
    object && object.rotateZ(rotZ);
  }, [object, rotZ]);

  useEffect(() => {
    object && !readyPos && (() => {
      initialPosition && object.position.setX(initialPosition.posX);
      initialPosition && object.position.setY(initialPosition.posY);
      initialPosition && object.position.setZ(initialPosition.posZ);
      dispatch(ReadyCameraPos(objectKey));
    })();
  }, [dispatch, object, objectKey, readyPos, initialPosition]);

  useEffect(() => {
    object && !readyRot && (() => {
      initialRotation && object.rotateX(initialRotation.rotX);
      initialRotation && object.rotateY(initialRotation.rotY);
      initialRotation && object.rotateZ(initialRotation.rotZ);
      dispatch(ReadyCameraRot(objectKey));
    })();
  }, [dispatch, object, objectKey, readyRot, initialRotation]);

  useEffect(() => {
    !ready && readyPos && readyRot && dispatch(ReadyCamera(objectKey));
  }, [dispatch, object, objectKey, readyPos, readyRot, ready]);

  useEffect(() => {
    calledCamera &&
    calledCamera === objectKey &&
    currentCamera !== calledCamera &&
    dispatch(SetCamera(objectKey));
  }, [dispatch, calledCamera, currentCamera, objectKey]);

  return null;
}
