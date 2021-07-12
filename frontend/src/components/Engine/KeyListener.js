import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PressKey, ReleaseKey } from '../../store/engine/actions';
import { useEventListener } from '../../utils/hooks';

export default function KeyListener () {
  const dispatch = useDispatch();

  const [add, remove] = useEventListener(document);
  const keys = useSelector(state => state.engine.keys);

  useEffect(() => {
    const onKeyDown = e => !keys[e.code] && dispatch(PressKey(e.code));
    const onKeyUp = e => dispatch(ReleaseKey(e.code));
    add.keydown(onKeyDown);
    add.keyup(onKeyUp);
    return () => {
      remove.keydown(onKeyDown);
      remove.keyup(onKeyUp);
    };
  }, [dispatch, add, remove, keys]);

  return null;
}
