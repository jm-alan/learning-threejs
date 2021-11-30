import { useEffect } from 'react';
import { useSelector } from 'react-redux';

export default function MouseLock () {
  const ready = useSelector(state => state.engine.renderer.ready);
  const paused = useSelector(state => state.engine.renderer.paused);
  const canvas = useSelector(state => state.engine.canvas.current);

  useEffect(() => {
    if (ready) {
      if (!paused) canvas.requestPointerLock();
      else document.exitPointerLock();
    }
    return () => document.exitPointerLock();
  }, [ready, paused, canvas]);

  return null;
}
