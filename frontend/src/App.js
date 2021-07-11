import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Canvas from './components/Canvas';
import Torus from './components/Geometries/Torus';
import Camera from './components/Camera';
import PointTest from './components/Lights/PointTest';
import { useEventListener } from './utils/hooks';
// import csrfetch from './store/csrfetch';
// import { RestoreUser } from './store/session';

export default function App () {
  // const dispatch = useDispatch();

  // const loaded = useSelector(state => state.session.loaded);

  // useEffect(() => {
  //   csrfetch.captureDispatch(dispatch);
  //   csrfetch.restoreCSRF();
  //   dispatch(RestoreUser());
  // }, [dispatch]);

  const [addEvent, removeEvent] = useEventListener(document);

  // ! RESTORE "loaded &&"

  useEffect(() => {
    const keyPrinter = e => console.log(e);
    addEvent.keydown(keyPrinter);
    addEvent.keyup(keyPrinter);
    return () => {
      removeEvent.keydown(keyPrinter);
      removeEvent.keyup(keyPrinter);
    };
  }, [addEvent, removeEvent]);

  return (
    <>
      <Switch>
        <Route path='/'>
          <Camera />
          <Torus />
          <PointTest />
          <Canvas />
        </Route>
      </Switch>
    </>
  );
}
