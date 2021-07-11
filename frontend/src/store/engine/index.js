import * as types from './types';
import * as Three from 'three';

const initialState = {
  canvas: null,
  scene: null,
  camera: null,
  renderer: null,
  ready: false,
  cameraPosX: 0,
  cameraPosY: 0,
  cameraPosZ: 0,
  cameraRotX: 0,
  cameraRotY: 0,
  cameraRotZ: 0,
  geometries: {},
  elements: {},
  pointLights: {},
  ambientLights: {},
  renderFunctions: {}
};

export default function reducer (
  state = initialState,
  {
    type, canvas, scene,
    camera, renderer, cameraPosX,
    cameraPosY, cameraPosZ, cameraRotX,
    cameraRotY, cameraRotZ, name,
    props, element, lightType,
    offset, color, renderFunction
  }
) {
  switch (type) {
    case types.CANVAS:
      return { ...state, canvas };
    case types.SCENE:
      return { ...state, scene };
    case types.CAMERA:
      return { ...state, camera };
    case types.CAMERA_POSX_ABSOLUTE:
      state.camera.position.setX(cameraPosX);
      return { ...state, cameraPosX };
    case types.CAMERA_POSY_ABSOLUTE:
      state.camera.position.setY(cameraPosY);
      return { ...state, cameraPosY };
    case types.CAMERA_POSZ_ABSOLUTE:
      state.camera.position.setZ(cameraPosZ);
      return { ...state, cameraPosZ };
    case types.CAMERA_POSX_RELATIVE:
      state.camera.position.setX(state.cameraPosX + cameraPosX);
      return { ...state, cameraPosX: state.cameraPosX + cameraPosX };
    case types.CAMERA_POSY_RELATIVE:
      state.camera.position.setY(state.cameraPosY + cameraPosY);
      return { ...state, cameraPosY: state.cameraPosY + cameraPosY };
    case types.CAMERA_POSZ_RELATIVE:
      state.camera.position.setZ(state.cameraPosZ + cameraPosZ);
      return { ...state, cameraPosZ: state.cameraPosZ + cameraPosZ };
    case types.CAMERA_ROTX_ABSOLUTE:
      state.camera.rotation.setX(cameraRotX);
      return { ...state, cameraRotX };
    case types.CAMERA_ROTY_ABSOLUTE:
      state.camera.rotation.setY(cameraRotY);
      return { ...state, cameraRotY };
    case types.CAMERA_ROTZ_ABSOLUTE:
      state.camera.rotation.setZ(cameraRotZ);
      return { ...state, cameraRotZ };
    case types.CAMERA_ROTX_RELATIVE:
      state.camera.rotation.setX(state.cameraRotX + cameraRotX);
      return { ...state, cameraRotX: state.cameraRotX + cameraRotX };
    case types.CAMERA_ROTY_RELATIVE:
      state.camera.rotation.setY(state.cameraRotY + cameraRotY);
      return { ...state, cameraRotY: state.cameraRotY + cameraRotY };
    case types.CAMERA_ROTZ_RELATIVE:
      state.camera.rotation.setZ(state.cameraRotZ + cameraRotZ);
      return { ...state, cameraRotZ: state.cameraRotZ + cameraRotZ };
    case types.RENDERER:
      return { ...state, renderer };
    case types.RENDER:
      state.renderer.render(state.scene, state.camera);
      return state;
    case types.ADD_RENDER_FUNCTION:
      return {
        ...state,
        renderFunctions: {
          ...state.renderFunctions,
          [name]: renderFunction
        }
      };
    case types.REMOVE_RENDER_FUNCTION:
      delete state.renderFunctions[name];
      return { ...state };
    case types.LIGHT_COLOR:
      state[`${lightType}s`][name].light.color.set(color);
      return {
        ...state,
        [`${lightType}s`]: {
          ...state[`${lightType}s`],
          [name]: {
            ...state[`${lightType}s`][name],
            color
          }
        }
      };
    case types.NEW_GEOMETRY:
      return {
        ...state,
        geometries: {
          ...state.geometries,
          [name]: {
            mesh: mountToScene(
              state,
              name,
              new Three.Mesh(
                new Three[`${props.geometryType}Geometry`](...props.geometrySpecs),
                new Three[`${props.materialType}Material`]({
                  color: props.materialColor,
                  wireframe: props.materialWireframe
                })
              )
            ),
            ...props.initialPosition,
            ...props.initialRotation
          }
        }
      };
    case types.DESTROY_GEOMETRY:
      delete state.geometries[name];
      return { ...state };
    case types.ADD_TO_SCENE:
      state.scene.add(element);
      return {
        ...state,
        elements: {
          ...state.elements,
          [name]: element
        }
      };
    case types.NEW_POINTLIGHT:
      return {
        ...state,
        pointLights: {
          ...state.pointLights,
          [name]: {
            light: mountToScene(state, name, new Three.PointLight(color)),
            color,
            posX: 0,
            posY: 0,
            posZ: 0
          },
          elements: {
            ...state.elements,
            [name]: element
          }
        }
      };
    case types.NEW_AMBIENTLIGHT:
      return {
        ...state,
        ambientLights: {
          ...state.ambientLights,
          [name]: {
            light: mountToScene(state, name, new Three.AmbientLight(color)),
            color
          }
        }
      };
    case types.LIGHTX_RELATIVE:
      state.pointLights[name].light.position.setX(state.pointLights[name].posX + offset);
      return {
        ...state,
        pointLights: {
          ...state.pointLights,
          [name]: {
            ...state.pointLights[name],
            posX: state.pointLights[name].posX + offset
          }
        }
      };
    case types.LIGHTY_RELATIVE:
      state.pointLights[name].light.position.setY(state.pointLights[name].posY + offset);
      return {
        ...state,
        pointLights: {
          ...state.pointLights,
          [name]: {
            ...state.pointLights[name],
            posY: state.pointLights[name].posY + offset
          }
        }
      };
    case types.LIGHTZ_RELATIVE:
      state.pointLights[name].light.position.setZ(state.pointLights[name].posZ + offset);
      return {
        ...state,
        pointLights: {
          ...state.pointLights,
          [name]: {
            ...state.pointLights[name],
            posZ: state.pointLights[name].posZ + offset
          }
        }
      };
    case types.LIGHTX_ABSOLUTE:
      state.pointLights[name].light.position.setX(offset);
      return {
        ...state,
        pointLights: {
          ...state.pointLights,
          [name]: {
            ...state.pointLights[name],
            posX: offset
          }
        }
      };
    case types.LIGHTY_ABSOLUTE:
      state.pointLights[name].light.position.setY(offset);
      return {
        ...state,
        pointLights: {
          ...state.pointLights,
          [name]: {
            ...state.pointLights[name],
            posY: offset
          }
        }
      };
    case types.LIGHTZ_ABSOLUTE:
      state.pointLights[name].light.position.setZ(offset);
      return {
        ...state,
        pointLights: {
          ...state.pointLights,
          [name]: {
            ...state.pointLights[name],
            posZ: offset
          }
        }
      };
    case types.BUILD_DEFAULT:
      state.renderer.setPixelRatio(window.devicePixelRatio);
      state.renderer.setSize(window.innerWidth, window.innerHeight);
      return { ...state, ready: true };
    case types.DESTROY_ENGINE:
      return { ...initialState, canvas: state.canvas };
    case types.DESTROY_CANVAS:
      return { ...state, canvas: null };
    default:
      return state;
  }
}

function mountToScene (state, name, element) {
  state.scene.add(element);
  return element;
}
