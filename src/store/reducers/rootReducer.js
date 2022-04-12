// state trang thai cua redux
import { combineReducers } from 'redux';
import sideBarReducer from './sideBarReducer';
import authReducer from "./authReducer";

const rootReducer = combineReducers({
    listSideBars: sideBarReducer,
    authReducer: authReducer
});
export default rootReducer;