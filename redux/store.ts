import { configureStore } from '@reduxjs/toolkit'
import computerSlice from './slices/computer';
import userSlice from './slices/user';


export const store = configureStore({
  reducer: {
    computer: computerSlice,
    user: userSlice,
  },
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;