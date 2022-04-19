import { createStore } from 'redux';
import rootReducer  from './reducers/rootReducer';
import persistStore from "redux-persist/es/persistStore";

export const store = createStore(rootReducer);
export const persistor = persistStore(store);
