import { combineReducers } from "@reduxjs/toolkit";
import { authReducer } from "./reducers/auth";
import {driverReducer} from './reducers/drivers';
import {userReducer} from "./reducers/users"; 
import {transactionReducer} from "./reducers/transactions"

export const rootReducer = combineReducers({
  authReducer,
  driverReducer,
  userReducer,
  transactionReducer
});

export type RootState = ReturnType<typeof rootReducer>;