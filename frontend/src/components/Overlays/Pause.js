import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { SetModalSize, SetModalPosition, ColorModalContent } from '../../store/modal';

export default function Pause () {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(SetModalSize({ height: '90vh', width: '50vw' }));
    dispatch(SetModalPosition({ top: '5vh', bottom: '5vh', left: '25vw', right: '25vw' }));
    dispatch(ColorModalContent('rgba(255, 255, 255, 0.3)'));
    return () => {
      dispatch(SetModalSize());
      dispatch(SetModalPosition());
      dispatch(ColorModalContent());
    };
  }, [dispatch]);

  return (
    <h1>
      The Game is Paused!
    </h1>
  );
}
