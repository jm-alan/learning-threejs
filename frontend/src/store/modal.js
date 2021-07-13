const SET_MODAL = 'modal/CURRENT';
const TEARDOWN = 'modal/TEARDOWN';
const MOORING = 'modal/MOORING';
const COLOR = 'modal/COLOR';
const POSITION = 'modal/POSITION';
const SIZE = 'modal/SIZE';

export const SetModal = Current => ({
  type: SET_MODAL,
  Current
});

export const TearDown = () => ({
  type: TEARDOWN
});

export const SetMooring = mooring => ({
  type: MOORING,
  mooring
});

export const ColorModalContent = backgroundColor => ({
  type: COLOR,
  backgroundColor
});

export const SetModalPosition = (position = {}) => ({
  type: POSITION,
  position
});

export const SetModalSize = (size = {}) => ({
  type: SIZE,
  size
});

export default function reducer (
  state = {
    Current: null,
    mooring: null,
    backgroundColor: '',
    position: {},
    size: {}
  },
  { type, Current, mooring, backgroundColor, position, size }
) {
  switch (type) {
    case SET_MODAL:
      return { ...state, Current };
    case TEARDOWN:
      return { ...state, Current: null };
    case MOORING:
      return { ...state, mooring };
    case COLOR:
      return { ...state, backgroundColor };
    case POSITION:
      return { ...state, ...position };
    case SIZE:
      return { ...state, ...size };
    default:
      return state;
  }
}
