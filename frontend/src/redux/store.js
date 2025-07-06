import { combineReducers, configureStore } from "@reduxjs/toolkit";
import loadSlice from './loadSlice'
import employeeSlice from './employeeSlice'
import  attendanceSlice  from './attendanceSlice'
import  leaveSlice  from './leaveSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  load: loadSlice,
  employee: employeeSlice,
  attendance : attendanceSlice,
  leave : leaveSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export default store;