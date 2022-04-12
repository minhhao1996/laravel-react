// state trang thai cua redux
import { combineReducers } from 'redux';
import sideBarReducer from './sideBarReducer';

const rootReducer = combineReducers({
    listSideBars: sideBarReducer
});
export default rootReducer;