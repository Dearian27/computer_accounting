import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";

type ComputerParams = {
  name: string,
  components: Array<{id: string, type: string}>,
  history: Array<{id: string, type: string, endData: string}>,
  location: string,
  responsible: string,
}
type componentsParams = Array<{
  anchor: string,
  _id: string,
  createdAt: string,
  updatedAt: string,
  name: string,
  type: string,
  __v: number
}>;

type userParams = {
  computers: [ComputerParams] | null,
  allComponents: componentsParams,
  editMode: boolean,
}
const initialState: userParams = {
  computers: null,
  allComponents: [],
  editMode: false,
}
const computerSlice: Slice = createSlice({
  initialState,
  name: 'computer',
  reducers: {
    setComputers: (state: userParams, action: PayloadAction<[ComputerParams]>) => {
      state.computers = action.payload;
    },
    setAllComponents: (state: userParams, action: PayloadAction<componentsParams>) => {
      state.allComponents = action.payload;
    },
    setEditMode: (state: userParams, action: PayloadAction<boolean>) => {
      state.editMode = action.payload;
    }
  }
})

export default computerSlice.reducer;
export const { setComputers, setAllComponents, setEditMode } = computerSlice.actions;