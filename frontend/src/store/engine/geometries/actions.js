import * as types from './types';

export const CreateGeometry = (
  name, geometryType, geometrySpecs,
  materialType, materialColor = 0xFFFFFF, materialWireframe = false,
  initialPosition = { posX: 0, posY: 0, posZ: 0 },
  initialRotation = { rotX: 0, rotY: 0, rotZ: 0 }
) => ({
  type: types.NEW,
  name,
  props: {
    geometryType,
    geometrySpecs,
    materialType,
    materialColor,
    materialWireframe,
    initialPosition,
    initialRotation
  }
});

export const DestroyGeometry = (name, parent) => ({
  type: types.DESTROY,
  name
});
