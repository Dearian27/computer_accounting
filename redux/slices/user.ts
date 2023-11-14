import { PayloadAction, createSlice } from "@reduxjs/toolkit";


type userParams = {
  pModal: boolean,
}

const initialState: userParams = {
  pModal: false,
} 

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setPModal: (state: userParams, action: PayloadAction<boolean>) => {
      state.pModal = action.payload;
    }
  }
})

export const { setPModal } = userSlice.actions;
export default userSlice.reducer;