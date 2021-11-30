import { Route, Switch } from 'react-router-dom';

import Scene from './components/Scene';
import Canvas from './components/Canvas';
import Camera from './components/Camera';
import Engine from './components/Engine';
import Director from './components/Director';
import Overlays from './components/Overlays';
import Torus from './components/Geometries/Torus';
import Movement from './components/Camera/Movement';
import PointLight from './components/Lights/PointLight';
import KeyListener from './components/Engine/KeyListener';
import Rotate from './components/Geometries/Animations/Rotate';
import MouseLock from './components/Engine/MouseLock';

export default function App () {
  return (
    <Switch>
      <Route exact path='/'>
        <Engine>
          <Director>
            <MouseLock />
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
                        name='testTorusRotateY'
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
    </Switch>
  );
}
