export default function(state = {}, action) {
  switch (action.type) {
    case 'persist/REHYDRATE':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
