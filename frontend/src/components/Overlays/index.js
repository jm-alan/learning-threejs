import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Pause from './Pause';
import { SetModal, TearDown } from '../../store/modal';
import { ShowModal, HideModal } from '../../store/UX';

export default function Overlays () {
  const dispatch = useDispatch();

  const ready = useSelector(state => state.engine.renderer.ready);
  const paused = useSelector(state => state.engine.renderer.paused);

  useEffect(() => {
    if (ready && paused) {
      dispatch(SetModal(Pause));
      dispatch(ShowModal());
    }
    return () => {
      dispatch(TearDown());
      dispatch(HideModal());
    };
  }, [dispatch, ready, paused]);

  return null;
}
