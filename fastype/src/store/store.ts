// Dans app/store.ts
import { configureStore } from '@reduxjs/toolkit';
import loginReducer from '../features/user/userSlice';
import textReducer from '../features/text/textSlice';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    login: loginReducer,
    texts: textReducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();