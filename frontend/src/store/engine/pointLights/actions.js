import * as types from './types';

export const CreatePointLight = (
  name,
  color = 0xFFFFFF,
  intensity,
  distance,
  decay,
  initialPosition = {
    posX: 0, posY: 0, posZ: 0
  }
) => ({
  type: types.NEW,
  name,
  props: { color, intensity, distance, decay, initialPosition }
});

export const DestroyPointLight = (name, parent) => ({
  type: types.DESTROY,
  name,
  parent
});

export const SetPointLightColor = (name, color) => ({
  type: types.COLOR,
  name,
  color
});

export const SetPointLightIntensity = (name, intensity) => ({
  type: types.INTENSITY,
  name,
  intensity
});

export const MovePointLightX = {
  relative (name, offset) {
    return {
      type: types.MOVEX_RELATIVE,
      name,
      offset
    };
  },
  absolute (name, offset) {
    return {
      type: types.MOVEX_ABSOLUTE,
      name,
      offset
    };
  }
};

export const MovePointLightY = {
  relative (name, offset) {
    return {
      type: types.MOVEY_RELATIVE,
      name,
      offset
    };
  },
  absolute (name, offset) {
    return {
      type: types.MOVEY_ABSOLUTE,
      name,
      offset
    };
  }
};

export const MovePointLightZ = {
  relative (name, offset) {
    return {
      type: types.MOVEZ_RELATIVE,
      name,
      offset
    };
  },
  absolute (name, offset) {
    return {
      type: types.MOVEZ_ABSOLUTE,
      name,
      offset
    };
  }
};
