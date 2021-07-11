const CANVAS = 'engine/CANVAS';

export const SetCanvas = canvas => ({
  type: CANVAS,
  canvas
});

export default function reducer (
  state = { mooring: null },
  { type, canvas }
) {
  switch (type) {
    case CANVAS:
      return { ...state, canvas };
    default:
      return state;
  }
}
