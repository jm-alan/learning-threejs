import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  CreatePointLight,
  // MovePointLightX,
  // MovePointLightY,
  MovePointLightZ
} from '../../store/engine/pointLights/actions';
import { AddToScene } from '../../store/engine/scene/actions';

export default function PointTest () {
  const dispatch = useDispatch();

  const pointOne = useSelector(state => state.engine.pointLights.all.pointOne?.light);
  const pointTwo = useSelector(state => state.engine.pointLights.all.pointTwo?.light);
  const pointThree = useSelector(state => state.engine.pointLights.all.pointThree?.light);
  const pointFour = useSelector(state => state.engine.pointLights.all.pointFour?.light);
  const pointFive = useSelector(state => state.engine.pointLights.all.pointFive?.light);
  const pointSix = useSelector(state => state.engine.pointLights.all.pointSix?.light);
  const ready = useSelector(state => state.engine.renderer.ready);

  useEffect(() => {
    if (ready) {
      // if (!pointOne) dispatch(CreatePointLight('pointOne', 0xFFFFFF));
      // if (!pointTwo) dispatch(CreatePointLight('pointTwo', 0xFFFFFF));
      // if (!pointThree) dispatch(CreatePointLight('pointThree', 0xFFFFFF));
      // if (!pointFour) dispatch(CreatePointLight('pointFour', 0xFFFFFF));
      if (!pointFive) dispatch(CreatePointLight('pointFive'));
      if (!pointSix) dispatch(CreatePointLight('pointSix'));
    }
  }, [dispatch, ready, pointOne, pointTwo, pointThree, pointFour, pointFive, pointSix]);

  // useEffect(() => {
  //   if (pointOne) dispatch(MovePointLightX.absolute('pointOne', -100));
  // }, [dispatch, pointOne]);
  // useEffect(() => {
  //   if (pointTwo) dispatch(MovePointLightX.absolute('pointTwo', 100));
  // }, [dispatch, pointTwo]);
  // useEffect(() => {
  //   if (pointThree) dispatch(MovePointLightY.absolute('pointThree', 100));
  // }, [dispatch, pointThree]);
  // useEffect(() => {
  //   if (pointFour) dispatch(MovePointLightY.absolute('pointFour', -100));
  // }, [dispatch, pointFour]);
  useEffect(() => {
    if (pointFive) {
      dispatch(AddToScene(pointFive));
      dispatch(MovePointLightZ.absolute('pointFive', -100));
    }
  }, [dispatch, pointFive]);
  useEffect(() => {
    if (pointSix) {
      dispatch(AddToScene(pointSix));
      dispatch(MovePointLightZ.absolute('pointSix', 100));
    }
  }, [dispatch, pointSix]);

  return null;
}
