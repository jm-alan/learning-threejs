import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { TearDown } from '../../store/modal';
import { HideModal } from '../../store/UX';

import './index.css';

export default function Modal () {
  const dispatch = useDispatch();

  const show = useSelector(state => state.UX.modal);
  const top = useSelector(state => state.modal.top);
  const left = useSelector(state => state.modal.left);
  const width = useSelector(state => state.modal.width);
  const right = useSelector(state => state.modal.right);
  const height = useSelector(state => state.modal.height);
  const bottom = useSelector(state => state.modal.bottom);
  const Current = useSelector(state => state.modal.Current);
  const mooring = useSelector(state => state.modal.mooring);
  const backgroundColor = useSelector(state => state.modal.backgroundColor);

  const onClose = () => {
    dispatch(TearDown());
    dispatch(HideModal());
  };

  const resist = e => e.stopPropagation();

  return mooring && show && Current && createPortal(
    <div id='modal-background' onClick={onClose}>
      <div
        id='modal-content'
        onClick={resist}
        style={{
          height,
          width,
          left,
          right,
          top,
          bottom,
          backgroundColor
        }}
      >
        <Current />
      </div>
    </div>,
    mooring
  );
}
