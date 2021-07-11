import * as types from './types';
import * as Three from 'three';

const initialState = {
  canvas: null,
  scene: null,
  camera: null,
  renderer: null,
  ready: false,
  cameraX: 0,
  cameraY: 0,
  cameraZ: 0,
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
    camera, renderer, cameraX,
    cameraY, cameraZ, name,
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
    case types.CAMERAX_ABSOLUTE:
      return { ...state, cameraX };
    case types.CAMERAY_ABSOLUTE:
      return { ...state, cameraY };
    case types.CAMERAZ_ABSOLUTE:
      return { ...state, cameraZ };
    case types.CAMERAX_RELATIVE:
      return { ...state, cameraX: state.cameraX + cameraX };
    case types.CAMERAY_RELATIVE:
      return { ...state, cameraY: state.cameraY + cameraY };
    case types.CAMERAZ_RELATIVE:
      return { ...state, cameraZ: state.cameraZ + cameraZ };
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
      return { ...state, cameraZ: 30, ready: true };
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
