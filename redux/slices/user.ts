import { PayloadAction, createSlice } from "@reduxjs/toolkit";


type userParams = {
  pModal: boolean,
  authModal: boolean,
  user: userAccountParams | null
}
export type userAccountParams = {
  name: string,
  surname: string,
  email: string,
  status: string
}

const initialState: userParams = {
  pModal: false,
  authModal: false,
  user: null
} 

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setPModal: (state: userParams, action: PayloadAction<boolean>) => {
      state.pModal = action.payload;
    },
    setAModal: (state: userParams, action: PayloadAction<boolean>) => {
      state.authModal = action.payload;
    },
    authModal: (state: userParams, action: PayloadAction<boolean>) => {
      state.authModal = action.payload;
    },
    setUser: (state: userParams, action: PayloadAction<userAccountParams>) => {
      state.user = action.payload;
    }
  }
})

export const { setPModal, setAModal,  setUser } = userSlice.actions;
export default userSlice.reducer;