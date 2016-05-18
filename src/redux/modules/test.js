const initialState = {};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'LOAD':
      return {test: 1};
    default:
      return state;
  }
}