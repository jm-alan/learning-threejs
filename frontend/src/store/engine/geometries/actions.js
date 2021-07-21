import * as types from './types';

export const CreateGeometry = (
  name, geometryType, geometrySpecs,
  materialType, materialColor = 0xFFFFFF, materialWireframe = false,
  initialPosition = { posX: 0, posY: 0, posZ: 0 },
  initialRotation = { rotX: 0, rotY: 0, rotZ: 0 }
) => async dispatch => {
  const Three = await import('three');
  dispatch({
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
    },
    object: new Three.Mesh(
      new Three[`${geometryType}Geometry`](...geometrySpecs),
      new Three[`${materialType}Material`]({
        color: materialColor,
        wireframe: materialWireframe
      })
    )
  });
};

export const DestroyStructure = name => ({
  type: types.DESTROY_STRUCTURE,
  name
});

export const DestroyMaterial = name => ({
  type: types.DESTROY_MATERIAL,
  name
});

export const DestroyMesh = name => ({
  type: types.DESTROY_MESH,
  name
});

export const TrashGeometry = name => ({
  type: types.TRASHABLE,
  name
});

export const UntrashGeometry = name => ({
  type: types.UNTRASHABLE,
  name
});

export const ReadyGeometry = name => ({
  type: types.READY,
  name
});

export const ReadyGeometryPos = name => ({
  type: types.READY_POS,
  name
});

export const ReadyGeometryRot = name => ({
  type: types.READY_ROT,
  name
});

export const MoveGeometryX = {
  relative (name, posX) {
    return {
      type: types.POSX_RELATIVE,
      name,
      posX
    };
  },
  absolute (name, posX) {
    return {
      type: types.POSX_ABSOLUTE,
      name,
      posX
    };
  }
};

export const MoveGeometryY = {
  relative (name, posY) {
    return {
      type: types.POSY_RELATIVE,
      name,
      posY
    };
  },
  absolute (name, posY) {
    return {
      type: types.POSY_ABSOLUTE,
      name,
      posY
    };
  }
};

export const MoveGeometryZ = {
  relative (name, posZ) {
    return {
      type: types.POSZ_RELATIVE,
      name,
      posZ
    };
  },
  absolute (name, posZ) {
    return {
      type: types.POSZ_ABSOLUTE,
      name,
      posZ
    };
  }
};

export const RotGeometryX = {
  relative (name, rotX) {
    return {
      type: types.ROTX_RELATIVE,
      name,
      rotX
    };
  },
  absolute (name, rotX) {
    return {
      type: types.ROTX_ABSOLUTE,
      name,
      rotX
    };
  }
};

export const RotGeometryY = {
  relative (name, rotY) {
    return {
      type: types.ROTY_RELATIVE,
      name,
      rotY
    };
  },
  absolute (name, rotY) {
    return {
      type: types.ROTY_ABSOLUTE,
      name,
      rotY
    };
  }
};

export const RotGeometryZ = {
  relative (name, rotZ) {
    return {
      type: types.ROTZ_RELATIVE,
      name,
      rotZ
    };
  },
  absolute (name, rotZ) {
    return {
      type: types.ROTZ_ABSOLUTE,
      name,
      rotZ
    };
  }
};
