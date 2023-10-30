import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";

type ComputerParams = {
  name: string,
  components: Array<{id: string, type: string}>,
  history: Array<{id: string, type: string, endData: string}>,
  location: string,
  responsible: string,
}
type userParams = {
  computer: ComputerParams | null;
  currentComponent: unknown;
  editMode: boolean;
}
const initialState: userParams = {
  computer: null,
  currentComponent: null,
  editMode: false,
}

const computerSlice: Slice = createSlice({
  initialState,
  name: 'computer',
  reducers: {
    setComputer: (state: userParams, action: PayloadAction<ComputerParams>) => {
      state.computer = action.payload;
    },
    setCurrentComponent: (state: userParams, action: PayloadAction) => {
      state.currentComponent = action.payload;
    },
    setEditMode: (state: userParams, action: PayloadAction<boolean>) => {
      state.editMode = action.payload;
    }
  }
})

export default computerSlice.reducer;
export const { setComputer, setCurrentComponent, setEditMode } = computerSlice.actions;