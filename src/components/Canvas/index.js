import { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';

import { UnsetCanvas, SetCanvas } from '../../store/engine/canvas/actions';

export default function Canvas () {
  const dispatch = useDispatch();

  const canvasRef = useRef(null);

  useEffect(() => {
    dispatch(SetCanvas(canvasRef.current));
    return () => dispatch(UnsetCanvas());
  }, [dispatch]);

  return (
    <canvas ref={canvasRef} id='canvas' />
  );
}
