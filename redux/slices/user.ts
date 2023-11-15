import { PayloadAction, createSlice } from "@reduxjs/toolkit";


type userParams = {
  pModal: boolean,
  authModal: boolean,
}

const initialState: userParams = {
  pModal: false,
  authModal: false,
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
    }
  }
})

export const { setPModal, setAModal } = userSlice.actions;
export default userSlice.reducer;