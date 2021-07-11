import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AddToScene, CreatePointLight } from '../../store/engine/actions';

export default function PointTest () {
  const dispatch = useDispatch();

  const pointTest = useSelector(state => state.engine.pointLights.pointTest?.light);
  const pointTestColor = useSelector(state => state.engine.pointLights.pointTest?.color);
  const posX = useSelector(state => state.engine.pointLights.pointTest?.posX);
  const posY = useSelector(state => state.engine.pointLights.pointTest?.posY);
  const posZ = useSelector(state => state.engine.pointLights.pointTest?.posZ);
  const ready = useSelector(state => state.engine.ready);

  useEffect(() => {
    if (ready && !pointTest) {
      dispatch(CreatePointLight('pointTest', 0xFFFFFF));
    }
  }, [dispatch, ready]);

  useEffect(() => {
    if (pointTest) {
      dispatch(AddToScene('pointTest', pointTest));
    }
  }, [dispatch, pointTest]);

  useEffect(() => {
    if (pointTest) {
      pointTest.position.set(posX, posY, posZ);
    }
  }, [pointTest, posX, posY, posZ]);

  useEffect(() => {
    if (pointTest) {
      pointTest.color.set(pointTestColor);
    }
  }, [pointTest, pointTestColor]);

  return null;
}
