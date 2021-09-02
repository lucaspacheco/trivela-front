import { createStore } from 'redux';
import { persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import authReducer from './auth/reducer'

const persistConfig =   {
  key: 'auth',
  storage,
};

const persistedReducer = persistReducer(persistConfig, authReducer)

const store = createStore(
    persistedReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );

const persistor = persistStore(store);

export { store, persistor };

  