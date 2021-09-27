import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { HideDebugMenu, ShowDebugMenu } from '../../store/engine/overlays/actions';
import { SetModalSize, SetModalPosition, ColorModalContent } from '../../store/modal';

export default function Pause () {
  const dispatch = useDispatch();

  const debugEnabled = useSelector(state => state.engine.overlays.debug);

  const enableDebug = () => dispatch(ShowDebugMenu());

  const disableDebug = () => dispatch(HideDebugMenu());

  useEffect(() => {
    dispatch(SetModalSize({ height: '90vh', width: '50vw' }));
    dispatch(SetModalPosition({ top: '5vh', bottom: '5vh', left: '25vw', right: '25vw' }));
    dispatch(ColorModalContent('rgba(255, 255, 255, 0.3)'));
    return () => {
      dispatch(SetModalSize());
      dispatch(SetModalPosition());
      dispatch(ColorModalContent());
    };
  }, [dispatch]);

  return (
    <div id='pause'>
      {debugEnabled
        ? (
          <button
            onClick={disableDebug}
          >
            Hide Debug Menu
          </button>
          )
        : (
          <button
            onClick={enableDebug}
          >
            Show Debug Menu
          </button>
          )}
    </div>
  );
}
