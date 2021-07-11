import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { DestroyCanvas, SetCanvas } from '../../store/engine/actions';

export default function Canvas () {
  const dispatch = useDispatch();

  const canvasRef = useRef(null);

  useEffect(() => {
    dispatch(SetCanvas(canvasRef.current));
    return () => dispatch(DestroyCanvas());
  }, [dispatch]);

  return (
    <canvas ref={canvasRef} id='canvas' />
  );
}
