import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { AuthFormSerice } from '../services/_AuthForm.service';
import { EmployeesService } from '../services/_Employees.service';
import authSlice from '../features/Auth/AuthForm.slice';
import loaderSlice from './loader.slice';

export const store = configureStore({
  reducer: {
    [AuthFormSerice.reducerPath]: AuthFormSerice.reducer,
    [EmployeesService.reducerPath]: EmployeesService.reducer,
    [authSlice.name]: authSlice.reducer,
    [loaderSlice.name]: loaderSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(AuthFormSerice.middleware, EmployeesService.middleware),
});

setupListeners(store.dispatch);
