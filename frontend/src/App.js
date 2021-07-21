// import { useEffect } from 'react';
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
import Rotate from './components/Geometries/Animations/Rotate';
import Scene from './components/Scene';
import Home from './components/Home';
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
        <Route exact path='/stages/0/'>
          <Engine>
            <Director>
              <Camera
                objectKey='cameraOne'
                FOV={90}
                initialPosition={{ posX: 0, posY: 0, posZ: 20 }}
                initialRotation={{ rotX: 0, rotY: 0, rotZ: 0 }}
              />
              <Scene name='main'>
                {sceneName => (
                  <>
                    <PointLight
                      sceneName={sceneName}
                      objectKey='pointOne'
                      initialPosition={{ posX: 100, posY: 0, posZ: 10 }}
                    />
                    <PointLight
                      sceneName={sceneName}
                      objectKey='pointTwo'
                      initialPosition={{ posX: -100, posY: 0, posZ: 10 }}
                      initialColor={0xFF0000}
                    />
                    <Torus
                      sceneName={sceneName}
                      name='torusOne'
                      specs={[5, 2, 30, 30]}
                      material='MeshStandard'
                      initialPosition={{ posX: -10, posY: 0, posZ: 0 }}
                      visibleRange={50}
                    >
                      {objectKey => (
                        <Rotate
                          objectKey={objectKey}
                          name='testTorusRotateYStandard'
                          rotY={0.01}
                        />
                      )}
                    </Torus>
                    <Torus
                      sceneName={sceneName}
                      name='torusTwo'
                      specs={[5, 2, 30, 30]}
                      material='MeshStandard'
                      initialPosition={{ posX: 10, posY: 0, posZ: 0 }}
                      visibleRange={50}
                    >
                      {objectKey => (
                        <Rotate
                          objectKey={objectKey}
                          name='testTorusRotateX'
                          rotX={-0.01}
                        />
                      )}
                    </Torus>
                  </>
                )}
              </Scene>
            </Director>
            <Overlays />
            <KeyListener />
            <Movement />
            <Canvas />
          </Engine>
        </Route>
        <Route exacth path='/'>
          <Home />
        </Route>
      </Switch>
    </>
  );
}
