import * as types from './types';

export const CreatePerspectiveCamera = (
  name, FOV = 75, frustNear = 0.1,
  frustFar = 1000, initialPosition = { posX: 0, posY: 0, posZ: 0 },
  initialRotation = { rotX: 0, rotY: 0, rotZ: 0 }
) => async dispatch => {
  const { PerspectiveCamera } = await import('three');
  dispatch({
    type: types.CREATE,
    name,
    props: {
      FOV,
      frustNear,
      frustFar,
      initialPosition,
      initialRotation
    },
    object: new PerspectiveCamera(
      FOV,
      window.innerWidth / window.innerHeight,
      frustNear,
      frustFar
    )
  });
};

export const DestroyPerspectiveCamera = name => ({
  type: types.DESTROY,
  name
});

export const SetCamera = name => ({
  type: types.CURRENT,
  name
});

export const CallCamera = name => ({
  type: types.CALL,
  name
});

export const ReadyCamera = name => ({
  type: types.READY,
  name
});

export const ReadyCameraPos = name => ({
  type: types.READY_POS,
  name
});

export const ReadyCameraRot = name => ({
  type: types.READY_ROT,
  name
});

export const AddVisibilityFunction = (name, action) => ({
  type: types.ADD_FUNCTION,
  name,
  action
});

export const RemoveVisibilityFunction = name => ({
  type: types.REMOVE_FUNCTION,
  name
});
