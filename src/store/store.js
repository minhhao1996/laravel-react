import { createStore } from 'redux';
import rootReducer  from './reducers/rootReducer';
import persistStore from "redux-persist/es/persistStore";

export const store = createStore(rootReducer,
    //Config redux dev tool extension
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
export const persistor = persistStore(store);
