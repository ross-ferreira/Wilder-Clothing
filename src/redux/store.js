import { createStore, applyMiddleware } from 'redux';
import { persistStore } from 'redux-persist';
//logger is a middleware
import logger from 'redux-logger';

import rootReducer from './root-reducer';

const middlewares = [logger];

//technically dont need to export STORE or PERSISTOR
export const store = createStore(rootReducer, applyMiddleware(...middlewares));

export const persistor = persistStore(store);

export default { store, persistor };
