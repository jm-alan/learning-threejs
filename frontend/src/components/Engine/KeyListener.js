import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PressKey, ReleaseKey } from '../../store/engine/keys/actions';
import { PauseRender, ResumeRender } from '../../store/engine/renderer/actions';
import { useEventListener } from '../../utils/hooks';

export default function KeyListener () {
  const dispatch = useDispatch();

  const keys = useSelector(state => state.engine.keys.pressed);
  const paused = useSelector(state => state.engine.renderer.paused);

  const [add, remove] = useEventListener(document);

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

  useEffect(() => {
    const onEscape = ({ code }) => {
      if (code === 'Escape' && !paused) dispatch(PauseRender());
      else if (code === 'Escape' && paused) dispatch(ResumeRender());
    };
    add.keydown(onEscape);
    return () => remove.keydown(onEscape);
  }, [dispatch, add, remove, paused]);

  return null;
}
