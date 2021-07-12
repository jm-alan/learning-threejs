import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CreatePointLight, MoveLightX, MoveLightY, MoveLightZ } from '../../store/engine/actions';

export default function PointTest () {
  const dispatch = useDispatch();

  const pointOne = useSelector(state => state.engine.pointLights.pointOne?.light);
  const pointTwo = useSelector(state => state.engine.pointLights.pointTwo?.light);
  const pointThree = useSelector(state => state.engine.pointLights.pointThree?.light);
  const pointFour = useSelector(state => state.engine.pointLights.pointFour?.light);
  const pointFive = useSelector(state => state.engine.pointLights.pointFive?.light);
  const pointSix = useSelector(state => state.engine.pointLights.pointSix?.light);
  const ready = useSelector(state => state.engine.ready);

  useEffect(() => {
    if (ready) {
      // if (!pointOne) dispatch(CreatePointLight('pointOne', 0xFFFFFF));
      // if (!pointTwo) dispatch(CreatePointLight('pointTwo', 0xFFFFFF));
      // if (!pointThree) dispatch(CreatePointLight('pointThree', 0xFFFFFF));
      // if (!pointFour) dispatch(CreatePointLight('pointFour', 0xFFFFFF));
      if (!pointFive) dispatch(CreatePointLight('pointFive', 0xFFFFFF));
      if (!pointSix) dispatch(CreatePointLight('pointSix', 0xFFFFFF));
    }
  }, [dispatch, ready, pointOne, pointTwo, pointThree, pointFour, pointFive, pointSix]);

  // useEffect(() => {
  //   if (pointOne) dispatch(MoveLightX.absolute('pointOne', -100));
  // }, [dispatch, pointOne]);
  // useEffect(() => {
  //   if (pointTwo) dispatch(MoveLightX.absolute('pointTwo', 100));
  // }, [dispatch, pointTwo]);
  // useEffect(() => {
  //   if (pointThree) dispatch(MoveLightY.absolute('pointThree', 100));
  // }, [dispatch, pointThree]);
  // useEffect(() => {
  //   if (pointFour) dispatch(MoveLightY.absolute('pointFour', -100));
  // }, [dispatch, pointFour]);
  useEffect(() => {
    if (pointFive) dispatch(MoveLightZ.absolute('pointFive', -100));
  }, [dispatch, pointFive]);
  useEffect(() => {
    if (pointSix) dispatch(MoveLightZ.absolute('pointSix', 100));
  }, [dispatch, pointSix]);

  return null;
}
