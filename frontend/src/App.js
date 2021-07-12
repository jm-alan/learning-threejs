// import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Canvas from './components/Canvas';
import Torus from './components/Geometries/Torus';
import Camera from './components/Camera';
import PointTest from './components/Lights/PointTest';
import Engine from './components/Engine';
import KeyListener from './components/Engine/KeyListener';
import Movement from './components/Camera/Movement';
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

  // ! RESTORE "loaded &&"

  return (
    <>
      <Switch>
        <Route path='/'>
          <Engine>
            <KeyListener />
            <Camera />
            <Movement />
            <Torus />
            <PointTest />
            <Canvas />
          </Engine>
        </Route>
      </Switch>
    </>
  );
}
