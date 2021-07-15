import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Draggable from './Draggable';
import { CallCamera } from '../../store/engine/cameras/actions';

export default function Debug ({ children }) {
  const dispatch = useDispatch();

  const [camera, callCamera] = useState('');

  const allCameras = useSelector(state => state.engine.cameras.all);
  const calledCamera = useSelector(state => state.engine.cameras.name);
  const currentCamera = useSelector(state => state.engine.cameras.current);
  const managedCamera = useSelector(state => state.engine.cameras.all[calledCamera]);
  const managedCameraExists = !!managedCamera && managedCamera.name === currentCamera.name;

  useEffect(() => {
    if (camera && camera !== calledCamera) dispatch(CallCamera(camera));
    if (calledCamera && !camera) callCamera(calledCamera);
  }, [dispatch, camera, calledCamera]);

  return (
    <Draggable>
      <div id='debug'>
        <div className='debug-organizer outer vertical'>
          <div className='debug-header'>
            <h1>
              Debug View
            </h1>
          </div>
          <div className='debug-organizer mid vertical'>
            <h2>Camera</h2>
            <select
              required
              value={camera}
              onChange={({ target: { value } }) => callCamera(value)}
            >
              {!camera && <option value=''>Loading...</option>}
              {Object.values(allCameras).map(({ name }, idx) => (
                (
                  <option
                    key={idx}
                    value={name}
                    disabled={calledCamera === name}
                  >
                    {name}
                  </option>
                )
              ))}
            </select>
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
