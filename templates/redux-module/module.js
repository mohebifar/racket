// Action types
export const LOAD = '<%= config.get("appName") %>/<%= name %>/LOAD';

// Initial state
const initialState = {
  loading: false,
  data: []
};

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        loading: true,
        ...state
      };
    default:
      return state;
  }
}

// Action creators
export function load() {
  return {
    type: LOAD
  };
}
