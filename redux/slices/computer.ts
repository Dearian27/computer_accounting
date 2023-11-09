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
  active: string[],
  computers: [ComputerParams] | null,
  allComponents: componentsParams,
  editMode: boolean,
}
const initialState: userParams = {
  active: [],
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
    },
    setActive: (state: userParams, action: PayloadAction<string> ) => {
      if(state.active.includes(action.payload)) {
        state.active = state.active.filter(element => element !== action.payload);
      } else {
        state.active.push(action.payload);
      }
    }
  }
})

export default computerSlice.reducer;
export const { setComputers, setAllComponents, setEditMode, setActive } = computerSlice.actions;