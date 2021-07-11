import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { CreatePointLight, MoveLightX, MoveLightY } from '../../store/engine/actions';

export default function PointTest () {
  const dispatch = useDispatch();

  const pointOne = useSelector(state => state.engine.pointLights.pointOne?.light);
  const pointTwo = useSelector(state => state.engine.pointLights.pointTwo?.light);
  const pointThree = useSelector(state => state.engine.pointLights.pointThree?.light);
  const pointFour = useSelector(state => state.engine.pointLights.pointFour?.light);
  const ready = useSelector(state => state.engine.ready);

  useEffect(() => {
    if (ready) {
      if (!pointOne) dispatch(CreatePointLight('pointOne', 0xFFFFFF));
      if (!pointTwo) dispatch(CreatePointLight('pointTwo', 0xFFFFFF));
      if (!pointThree) dispatch(CreatePointLight('pointThree', 0xFFFFFF));
      if (!pointFour) dispatch(CreatePointLight('pointFour', 0xFFFFFF));
    }
  }, [dispatch, ready, pointOne, pointTwo, pointThree, pointFour]);

  useEffect(() => {
    if (pointOne) {
      dispatch(MoveLightX.absolute('pointOne', -100));
    }
    if (pointTwo) {
      dispatch(MoveLightX.absolute('pointTwo', 100));
    }
    if (pointThree) {
      dispatch(MoveLightY.absolute('pointThree', -100));
    }
    if (pointFour) {
      dispatch(MoveLightY.absolute('pointFour', 100));
    }
  }, [dispatch, pointOne, pointTwo, pointThree, pointFour]);

  return null;
}
