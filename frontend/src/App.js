// import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';

import Canvas from './components/Canvas';
import Torus from './components/Geometries/Torus';
import Camera from './components/Camera';
import PointLight from './components/Lights/PointLight';
import Engine from './components/Engine';
import KeyListener from './components/Engine/KeyListener';
import Movement from './components/Camera/Movement';
import Overlays from './components/Overlays';
import Director from './components/Director';
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
            <Director />
            <Overlays />
            <KeyListener />
            <Camera
              objectKey='cameraOne'
              initialPosition={{
                posX: 0,
                posY: 0,
                posZ: 50
              }}
            />
            <Movement />
            <Torus
              objectKey='testTorus'
              specs={[20, 3, 16, 100]}
              material='MeshStandard'
            />
            <PointLight
              objectKey='pointOne'
              initialPosition={{
                posX: 0,
                posY: 0,
                posZ: 100
              }}
            />
            <PointLight
              objectKey='pointTwo'
              initialPosition={{
                posX: 0,
                posY: 0,
                posZ: -100
              }}
            />
            <Canvas />
          </Engine>
        </Route>
      </Switch>
    </>
  );
}
