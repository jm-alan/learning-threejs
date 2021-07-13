import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CreatePointLight } from '../../store/engine/pointLights/actions';
import { AddToScene, RemoveFromScene } from '../../store/engine/scene/actions';

export default function PointLight ({
  objectKey, initialColor, initialPosition,
  initialIntensity, initialDistance, initialDecay,
  children
}) {
  const dispatch = useDispatch();

  const ready = useSelector(state => state.engine.renderer.ready);
  const light = useSelector(state => state.engine.pointLights.all[objectKey]);
  const posX = useSelector(state => state.engine.pointLights.all[objectKey]?.posX);
  const posY = useSelector(state => state.engine.pointLights.all[objectKey]?.posY);
  const posZ = useSelector(state => state.engine.pointLights.all[objectKey]?.posZ);
  const color = useSelector(state => state.engine.pointLights.all[objectKey]?.color);
  const intensity = useSelector(state => state.engine.pointLights.all[objectKey]?.intensity);
  const distance = useSelector(state => state.engine.pointLights.all[objectKey]?.distance);
  const decay = useSelector(state => state.engine.pointLights.all[objectKey]?.decay);

  useEffect(() => {
    if (ready) {
      if (!light) {
        dispatch(CreatePointLight(
          objectKey, initialColor, initialIntensity,
          initialDistance, initialDecay, initialPosition
        ));
      }
    }
  }, [dispatch, ready, light, objectKey, initialColor, initialPosition, initialIntensity, initialDistance, initialDecay]);

  useEffect(() => {
    if (ready && light) dispatch(AddToScene(light));
    return () => !ready && light && dispatch(RemoveFromScene(light));
  }, [dispatch, ready, light]);

  useEffect(() => {
    if (light) light.object.position.setX(posX);
  }, [light, posX]);

  useEffect(() => {
    if (light) light.object.position.setY(posY);
  }, [light, posY]);

  useEffect(() => {
    if (light) light.object.position.setZ(posZ);
  }, [light, posZ]);

  useEffect(() => {
    if (light) light.object.intensity = intensity;
  }, [light, intensity]);

  useEffect(() => {
    if (light) light.object.distance = distance;
  }, [light, distance]);

  useEffect(() => {
    if (light) light.object.decay = decay;
  }, [light, decay]);

  useEffect(() => {
    if (light) light.object.color.set(color);
  }, [light, color]);

  return children ?? null;
}
