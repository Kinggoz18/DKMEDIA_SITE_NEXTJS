import { combineReducers, configureStore } from "@reduxjs/toolkit";
import newsletterReducer from "./NewsletterSlice";
import storage from 'redux-persist/lib/storage'
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

const persistConfig = {
  key: 'root',
  storage,
}

const rootReducer = combineReducers({
  newsletter: newsletterReducer
})

const makeConfiguredStore = () =>
  configureStore({
    reducer: rootReducer,
  })

export const makeStore = () => {
  const isServer = typeof window === 'undefined';

  if (isServer) {
    return makeConfiguredStore()
  } else {
    const persistedReducer = persistReducer(persistConfig, rootReducer)
    let store: any = configureStore({
      reducer: {
        newsletter: persistedReducer
      },
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
          serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
          }
        }),
    })
    store.__persistor = persistStore(store)
    return store;
  }
  return
}

export type AppStore = ReturnType<typeof makeStore>;
export type IRootState = ReturnType<AppStore['getState']>
export type RootStateDispatch = AppStore['dispatch']