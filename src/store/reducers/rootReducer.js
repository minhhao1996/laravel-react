// state trang thai cua redux
import { combineReducers } from 'redux';
import sideBarReducer from './sideBarReducer';
import adminReducer from "./adminReducer";
import storage  from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import {persistStore,persistReducer} from "redux-persist";

const persistCommonConfig ={
    storage:storage,
    stateReconciler:autoMergeLevel2

}
const adminPersistConfig = {
    ...persistCommonConfig,
    key:'admin',
    whitelist:['isLoggedIn','adminInfo'],

};
const rootReducer = combineReducers({
    listSideBars: sideBarReducer,
    adminStore: persistReducer(adminPersistConfig,adminReducer),
});
export default rootReducer;