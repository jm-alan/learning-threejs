import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PressKey, ReleaseKey } from '../../store/engine/keys/actions';
import { useEventListener } from '../../utils/hooks';

export default function KeyListener () {
  const dispatch = useDispatch();

  const [add, remove] = useEventListener(document);
  const keys = useSelector(state => state.engine.keys.pressed);

  useEffect(() => {
    const onKeyDown = e => {
      e.preventDefault();
      e.stopPropagation();
      !keys[e.code] && dispatch(PressKey(e.code));
    };
    const onKeyUp = e => {
      e.preventDefault();
      e.stopPropagation();
      dispatch(ReleaseKey(e.code));
    };
    add.keydown(onKeyDown);
    add.keyup(onKeyUp);
    return () => {
      remove.keydown(onKeyDown);
      remove.keyup(onKeyUp);
    };
  }, [dispatch, add, remove, keys]);

  return null;
}
