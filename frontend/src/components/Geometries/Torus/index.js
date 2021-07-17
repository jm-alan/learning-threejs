import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CreateGeometry, DestroyGeometry, ReadyGeometry, ReadyGeometryPos, ReadyGeometryRot } from '../../../store/engine/geometries/actions';
import { AddToScene, RemoveFromScene } from '../../../store/engine/scenes/actions';

export default function Torus ({
  name, specs, material,
  sceneName, color, wireframe,
  initialPosition, initialRotation, children
}) {
  const dispatch = useDispatch();

  const renderReady = useSelector(state => state.engine.renderer.ready);
  const torus = useSelector(state => state.engine.geometries.all[name]);
  const object = useSelector(state => state.engine.geometries.all[name]?.object);
  const posX = useSelector(state => state.engine.geometries.all[name]?.posX);
  const posY = useSelector(state => state.engine.geometries.all[name]?.posY);
  const posZ = useSelector(state => state.engine.geometries.all[name]?.posZ);
  const rotX = useSelector(state => state.engine.geometries.all[name]?.rotX);
  const rotY = useSelector(state => state.engine.geometries.all[name]?.rotY);
  const rotZ = useSelector(state => state.engine.geometries.all[name]?.rotZ);
  const readyPos = useSelector(state => state.engine.geometries.all[name]?.readyPos);
  const readyRot = useSelector(state => state.engine.geometries.all[name]?.readyRot);
  const objectReady = useSelector(state => state.engine.geometries.all[name]?.ready);
  const trashable = useSelector(state => state.engine.geometries.all[name]?.trashable);

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
    object && (object.rotation.x = rotX);
  }, [object, rotX]);

  useEffect(() => {
    object && (object.rotation.y = rotY);
  }, [object, rotY]);

  useEffect(() => {
    object && (object.rotation.z = rotZ);
  }, [object, rotZ]);

  useEffect(() => {
    renderReady && !torus &&
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
    return () => {
      trashable && torus && dispatch(RemoveFromScene(sceneName, torus));
      trashable && torus && dispatch(DestroyGeometry(name));
    };
  }, [
    dispatch, name, specs, material, color, wireframe,
    initialPosition, initialRotation, torus, renderReady,
    trashable, sceneName
  ]);

  useEffect(() => {
    objectReady && dispatch(AddToScene(sceneName, torus));
  }, [dispatch, sceneName, objectReady, torus]);

  useEffect(() => {
    object && !readyPos && (() => {
      initialPosition && object.position.setX(initialPosition.posX);
      initialPosition && object.position.setY(initialPosition.posY);
      initialPosition && object.position.setZ(initialPosition.posZ);
      dispatch(ReadyGeometryPos(name));
    })();
  }, [dispatch, object, readyPos, initialPosition, name]);

  useEffect(() => {
    object && !readyRot && (() => {
      initialRotation && object.rotateX(initialRotation.rotX);
      initialRotation && object.rotateY(initialRotation.rotY);
      initialRotation && object.rotateZ(initialRotation.rotZ);
      dispatch(ReadyGeometryRot(name));
    })();
  }, [dispatch, object, readyRot, initialRotation, name]);

  useEffect(() => {
    !objectReady && readyPos && readyRot && dispatch(ReadyGeometry(name));
  });

  return (torus && children && children(name)) ?? null;
}
