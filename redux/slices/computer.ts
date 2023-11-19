import { PayloadAction, Slice, createSlice } from "@reduxjs/toolkit";
import { historyParams } from "../../src/component/PartDetails";
import { componentTypeVariants } from "../../src/component/ComponentAccount";

export type ComputerParams = {
  _id: string,
  name: string,
  components: Array<{id: [string], type: componentTypeVariants, name: string}>,
  history: historyParams,
  location: string,
  responsible: string,
  notes: string
}
export type componentParams = {
  anchor: string,
  _id: string,
  createdAt: string,
  updatedAt: string,
  name: string,
  type: componentTypeVariants,
  __v: number
};

type userParams = {
  active: string[],
  computers: [ComputerParams] | null,
  allComponents: Array<componentParams>,
  editMode: boolean,
  searchText: string,
  modal: {
    currentComponentId: string,
    isActive: boolean,
    computerId: string,
    type: string,
  }
}
const initialState: userParams = {
  active: [],
  computers: null,
  allComponents: [],
  editMode: false,
  searchText: "",
  modal: {
    currentComponentId: "",
    isActive: false,
    computerId: "",
    type: '',
  },
}
const computerSlice: Slice = createSlice({
  initialState,
  name: 'computer',
  reducers: {
    setComputers: (state: userParams, action: PayloadAction<[ComputerParams]>) => {
      state.computers = action.payload;
    },
    setAllComponents: (state: userParams, action: PayloadAction<Array<componentParams>>) => {
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
    },
    setSearchText: (state: userParams, action: PayloadAction<string> ) => {
      state.searchText = action.payload;
    },
    setModal: (state: userParams, action: PayloadAction<{currentComponentId: string, isActive: boolean, computerId: string, type: string}> ) => {
      state.modal = {
        ...action.payload,
        currentComponentId: action.payload?.currentComponentId || '',
      };
    },
    clearModal: (state: userParams) => {
      state.modal = {
        currentComponentId: "",
        isActive: false,
        computerId: "",
        type: '',
      }
    },
  }
})

export default computerSlice.reducer;
export const { setComputers, setAllComponents, setEditMode, setActive, setSearchText, setModal, clearModal } = computerSlice.actions;