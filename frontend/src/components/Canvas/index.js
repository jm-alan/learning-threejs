import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { SetCanvas } from '../../store/engine';

export default function Canvas () {
  const dispatch = useDispatch();

  const canvasRef = useRef(null);

  useEffect(() => {
    dispatch(SetCanvas(canvasRef.current));
  }, [dispatch]);

  return (
    <canvas ref={canvasRef} id='canvas' />
  );
}
