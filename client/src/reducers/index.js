import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import location from './location';
import persisted from './persisted';
import note from './note';

export default combineReducers({
  router: routerReducer,
  note,
  location,
  persisted
});
