import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';

import Pause from './Pause';
import Debug from './Debug';
import { SetModal, TearDown } from '../../store/modal';
import { ShowModal, HideModal } from '../../store/UX';

import './index.css';
import { AddOverlay, RemoveOverlay } from '../../store/engine/overlays/actions';

export default function Overlays () {
  const dispatch = useDispatch();

  const ready = useSelector(state => state.engine.renderer.ready);
  const paused = useSelector(state => state.engine.renderer.paused);
  const current = useSelector(state => Object.values(state.engine.overlays.current));
  const mooring = useSelector(state => state.engine.overlays.mooring);
  const debugEnabled = useSelector(state => state.engine.overlays.debug);

  const funcToComponent = (Element, idx) => <Element key={idx} />;

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

  useEffect(() => {
    if (ready && debugEnabled) dispatch(AddOverlay('debug', Debug));
    else if (ready && !debugEnabled) dispatch(RemoveOverlay('debug'));
  }, [dispatch, ready, debugEnabled]);

  return mooring && createPortal(
    current.map(funcToComponent),
    mooring
  );
}
