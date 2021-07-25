import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddVisibilityFunction, RemoveVisibilityFunction } from '../../../store/engine/cameras/actions';

import {
  CreateGeometry,
  DestroyMaterial,
  DestroyMesh,
  DestroyStructure,
  MoveGeometryX,
  MoveGeometryY,
  MoveGeometryZ,
  RotGeometryX,
  RotGeometryY,
  RotGeometryZ,
  ReadyGeometry,
  ReadyGeometryPos,
  ReadyGeometryRot,
  TrashGeometry,
  UntrashGeometry
} from '../../../store/engine/geometries/actions';
import { AddToScene, RemoveFromScene } from '../../../store/engine/scenes/actions';

export default function Torus ({
  name, specs, material,
  sceneName, color, wireframe, visibleRange,
  initialPosition, initialRotation, children
}) {
  const dispatch = useDispatch();

  const renderReady = useSelector(state => state.engine.renderer.ready);
  const torus = useSelector(state => state.engine.geometries.all[name]);
  const object = useSelector(state => state.engine.geometries.all[name]?.object);
  const posX = useSelector(state => state.engine.geometries.all[name]?.posX);
  const posY = useSelector(state => state.engine.geometries.all[name]?.posY);
  const posZ = useSelector(state => state.engine.geometries.all[name]?.posZ);
  const readyPos = useSelector(state => state.engine.geometries.all[name]?.readyPos);
  const readyRot = useSelector(state => state.engine.geometries.all[name]?.readyRot);
  const objectReady = useSelector(state => state.engine.geometries.all[name]?.ready);
  const trashable = useSelector(state => state.engine.geometries.all[name]?.trashable);

  useEffect(() => {
    renderReady && !object && !trashable &&
      dispatch(CreateGeometry(
        name,
        'Torus',
        specs,
        material,
        color,
        wireframe,
        initialPosition,
        initialRotation
      ));
    object && trashable && dispatch(DestroyMaterial(name));
    object && trashable && dispatch(DestroyStructure(name));
    object && trashable && dispatch(RemoveFromScene(sceneName, torus));
    object && trashable && dispatch(DestroyMesh(name));
  }, [
    dispatch, name, specs, material, color, wireframe,
    initialPosition, initialRotation, torus, renderReady,
    trashable, sceneName, object
  ]);

  useEffect(() => {
    !trashable && object && objectReady && dispatch(AddToScene(sceneName, torus));
    return () => object && dispatch(RemoveFromScene(sceneName, torus));
  }, [dispatch, object, sceneName, objectReady, torus, trashable]);

  useEffect(() => {
    const readyGeometryPosition = () => {
      object.position.setX(initialPosition.posX);
      dispatch(MoveGeometryX.absolute(name, initialPosition.posX));
      object.position.setY(initialPosition.posY);
      dispatch(MoveGeometryY.absolute(name, initialPosition.posY));
      object.position.setZ(initialPosition.posZ);
      dispatch(MoveGeometryZ.absolute(name, initialPosition.posZ));
    };
    !trashable && object && !readyPos && (() => {
      initialPosition && readyGeometryPosition();
      dispatch(ReadyGeometryPos(name));
    })();
  }, [dispatch, object, readyPos, initialPosition, name, trashable]);

  useEffect(() => {
    const readyGeometryRotation = () => {
      object.rotation.x = initialRotation.rotX;
      dispatch(RotGeometryX.absolute(name, initialRotation.rotX));
      object.rotation.y = initialRotation.rotY;
      dispatch(RotGeometryY.absolute(name, initialRotation.rotY));
      object.rotation.z = initialRotation.rotZ;
      dispatch(RotGeometryZ.absolute(name, initialRotation.rotZ));
    };
    !trashable && object && !readyRot && (() => {
      initialRotation && readyGeometryRotation();
      dispatch(ReadyGeometryRot(name));
    })();
  }, [dispatch, object, readyRot, initialRotation, name, trashable]);

  useEffect(() => {
    !trashable && !objectReady && readyPos && readyRot && dispatch(ReadyGeometry(name));
  }, [dispatch, trashable, objectReady, readyPos, readyRot, name]);

  useEffect(() => {
    const amVisible = (cameraX, cameraY, cameraZ) => (
      ((
        ((posX - cameraX) ** 2) +
        ((posY - cameraY) ** 2) +
        ((posZ - cameraZ) ** 2)
      ) < (visibleRange ** 2)) &&
      ((trashable && dispatch(UntrashGeometry(name))) || true)
    ) || (!trashable && dispatch(TrashGeometry(name)));
    dispatch(AddVisibilityFunction(`${name}CheckVisible`, amVisible));
    return () => dispatch(RemoveVisibilityFunction(`${name}CheckVisible`));
  }, [dispatch, posX, posY, posZ, object, trashable, name, visibleRange]);

  return (torus && children && children(name)) ?? null;
}
