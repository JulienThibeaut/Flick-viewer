import { combineReducers } from 'redux';
import images from './imageReducer';

// Combines all reducers to a single reducer function
const rootReducer = combineReducers({
  images
});

export default rootReducer;
