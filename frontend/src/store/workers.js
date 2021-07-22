const CREATE = 'workers/CREATE';
const DESTROY = 'workers/DESTROY';

export const CreateWorker = name => ({
  type: CREATE,
  name
});

export const DestroyWorker = name => ({
  type: DESTROY,
  name
});

export default function reducer (
  state = { all: {} },
  { type, name }
) {
  switch (type) {
    case CREATE:
      return {
        ...state,
        all: {
          ...state.all,
          [name]: new window.Worker(
            URL.createObjectURL(
              new window.Blob([
                'self.onmessage = e => e.data();'
              ], { type: 'text/javascript' })
            )
          )
        }
      };
    case DESTROY:
      state.all[name].terminate();
      delete state.all[name];
      return {
        ...state,
        all: {
          ...state.all
        }
      };
    default:
      return state;
  }
}
