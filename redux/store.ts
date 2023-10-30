import { configureStore } from '@reduxjs/toolkit'
import computerSlice from './slices/computer';


export const store = configureStore({
  reducer: {
    computer: computerSlice,
  },
})


export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;