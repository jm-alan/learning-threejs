import { lazy, Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';

const Home = lazy(() => import('./components/Home'));
const Scene = lazy(() => import('./components/Scene'));
const Canvas = lazy(() => import('./components/Canvas'));
const Camera = lazy(() => import('./components/Camera'));
const Engine = lazy(() => import('./components/Engine'));
const Director = lazy(() => import('./components/Director'));
const Overlays = lazy(() => import('./components/Overlays'));
const Torus = lazy(() => import('./components/Geometries/Torus'));
const Movement = lazy(() => import('./components/Camera/Movement'));
const PointLight = lazy(() => import('./components/Lights/PointLight'));
const KeyListener = lazy(() => import('./components/Engine/KeyListener'));
const Rotate = lazy(() => import('./components/Geometries/Animations/Rotate'));
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
    <Switch>
      <Route exact path='/stages/0/'>
        <Suspense fallback={<h1 className='loading'>Loading Main Engine...</h1>}>
          <Engine>
            <Suspense fallback={<h1 className='loading'>Loading Camera and Scene Management...</h1>}>
              <Director>
                <Suspense fallback={<h1 className='loading'>Loading Camera One...</h1>}>
                  <Camera
                    objectKey='cameraOne'
                    FOV={90}
                    initialPosition={{ posX: 0, posY: 0, posZ: 20 }}
                    initialRotation={{ rotX: 0, rotY: 0, rotZ: 0 }}
                  />
                </Suspense>
                <Suspense fallback={<h1 className='loading'>Loading Main Scene...</h1>}>
                  <Scene name='main'>
                    {sceneName => (
                      <>
                        <Suspense fallback={<h1 className='loading'>Loading PointLight One...</h1>}>
                          <PointLight
                            sceneName={sceneName}
                            objectKey='pointOne'
                            initialPosition={{ posX: 100, posY: 0, posZ: 10 }}
                          />
                        </Suspense>
                        <Suspense fallback={<h1 className='loading'>Loading PointLight Two...</h1>}>
                          <PointLight
                            sceneName={sceneName}
                            objectKey='pointTwo'
                            initialPosition={{ posX: -100, posY: 0, posZ: 10 }}
                            initialColor={0xFF0000}
                          />
                        </Suspense>
                        <Suspense fallback={<h1 className='loading'>Loading Torus One...</h1>}>
                          <Torus
                            sceneName={sceneName}
                            name='torusOne'
                            specs={[5, 2, 30, 30]}
                            material='MeshStandard'
                            initialPosition={{ posX: -10, posY: 0, posZ: 0 }}
                            visibleRange={50}
                          >
                            {objectKey => (
                              <Suspense fallback={<h1 className='loading'>Loading Torus One Rotate Animation...</h1>}>
                                <Rotate
                                  objectKey={objectKey}
                                  name='testTorusRotateYStandard'
                                  rotY={0.01}
                                />
                              </Suspense>
                            )}
                          </Torus>
                        </Suspense>
                        <Suspense fallback={<h1 className='loading'>Loading Torus Two...</h1>}>
                          <Torus
                            sceneName={sceneName}
                            name='torusTwo'
                            specs={[5, 2, 30, 30]}
                            material='MeshStandard'
                            initialPosition={{ posX: 10, posY: 0, posZ: 0 }}
                            visibleRange={50}
                          >
                            {objectKey => (
                              <Suspense fallback={<h1 className='loading'>Loading Torus Two Rotate Animation...</h1>}>
                                <Rotate
                                  objectKey={objectKey}
                                  name='testTorusRotateX'
                                  rotX={-0.01}
                                />
                              </Suspense>
                            )}
                          </Torus>
                        </Suspense>
                      </>
                    )}
                  </Scene>
                </Suspense>
              </Director>
            </Suspense>
            <Suspense fallback={<h1 className='loading'>Loading Overlays...</h1>}>
              <Overlays />
            </Suspense>
            <Suspense fallback={<h1 className='loading'>Loading Keybindings...</h1>}>
              <KeyListener />
            </Suspense>
            <Suspense fallback={<h1 className='loading'>Loading Camera Movement Control...</h1>}>
              <Movement />
            </Suspense>
            <Suspense fallback={<h1 className='loading'>Loading Main Canvas...</h1>}>
              <Canvas />
            </Suspense>
          </Engine>
        </Suspense>
      </Route>
      <Route exacth path='/'>
        <Suspense fallback={<h1 className='loading'>Loading...</h1>}>
          <Home />
        </Suspense>
      </Route>
    </Switch>
  );
}
