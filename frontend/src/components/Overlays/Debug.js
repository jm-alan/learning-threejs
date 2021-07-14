// import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Draggable from './Draggable';

export default function Debug () {
  const dispatch = useDispatch();

  const calledCamera = useSelector(state => state.engine.cameras.name);
  const currentCamera = useSelector(state => state.engine.cameras.current);
  const managedCamera = useSelector(state => state.engine.cameras.all[calledCamera]);
  const managedCameraExists = !!managedCamera && managedCamera.name === currentCamera.name;

  return (
    <Draggable>
      <div id='debug'>
        <div className='debug-organizer outer vertical'>
          <div className='debug-header'>
            <h1>Debug View</h1>
          </div>
          <div className='debug-organizer mid vertical'>
            <h2>Camera</h2>
            <div id='debug-camera'>
              <h3>
                Called: {calledCamera}
              </h3>
              <h3>
                Managed: {`${(managedCameraExists && managedCamera.name) || `false, camera.current: ${currentCamera.name}}`}`}
              </h3>
              {managedCameraExists && (
                <>
                  <h3>
                    X: {managedCamera.posX} Y: {managedCamera.posY} Z: {managedCamera.posZ}
                  </h3>
                  <h3>
                    RotX: {managedCamera.rotX} RotY: {managedCamera.rotY} RotZ: {managedCamera.rotZ}
                  </h3>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Draggable>
  );
}
