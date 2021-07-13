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

  const calledCamera = useSelector(state => state.engine.cameras.name);
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
    if (object) object.position.setX(posX);
  }, [object, posX]);

  useEffect(() => {
    if (object) object.position.setY(posY);
  }, [object, posY]);

  useEffect(() => {
    if (object) object.position.setZ(posZ);
  }, [object, posZ]);

  useEffect(() => {
    if (object) object.rotateX(rotX);
  }, [object, rotX]);

  useEffect(() => {
    if (object) object.rotateY(rotY);
  }, [object, rotY]);

  useEffect(() => {
    if (object) object.rotateZ(rotZ);
  }, [object, rotZ]);

  useEffect(() => {
    if (object && !readyPos && initialPosition) {
      object.position.setX(initialPosition.posX);
      object.position.setY(initialPosition.posY);
      object.position.setZ(initialPosition.posZ);
      dispatch(ReadyCameraPos(objectKey));
    } else if (!readyPos) dispatch(ReadyCameraPos(objectKey));
  }, [dispatch, object, objectKey, readyPos, initialPosition]);

  useEffect(() => {
    if (object && !readyRot && initialRotation) {
      object.rotateX(initialRotation.rotX);
      object.rotateY(initialRotation.rotY);
      object.rotateZ(initialRotation.rotZ);
      dispatch(ReadyCameraRot(objectKey));
    } else if (!readyRot) dispatch(ReadyCameraRot(objectKey));
  }, [dispatch, readyRot, object, objectKey, initialRotation]);

  useEffect(() => {
    if (object && !ready && readyPos && readyRot) dispatch(ReadyCamera(objectKey));
  }, [dispatch, object, objectKey, readyPos, readyRot, ready]);

  useEffect(() => {
    if (
      calledCamera &&
      calledCamera === objectKey &&
      currentCamera !== calledCamera
    ) dispatch(SetCamera(objectKey));
  }, [dispatch, currentCamera, objectKey]);

  return null;
}
