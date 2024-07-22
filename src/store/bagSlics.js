import { createSlice } from "@reduxjs/toolkit";

const bagSlice = createSlice({
  name: 'bag',
  initialState: [],

  reducers: {
    initialItems:(state, action)=>{
      return action.payload
    },
    addTobag: (state, action) => {
      const product = action.payload
      state.push(product);
    },
    removeTobag: (state, action) => {
      const itemId = action.payload;
      return state.filter(item => item.id !== itemId);
      
    },
    clearCart: () => {
      return [];
    }
  }
})

export default bagSlice
export const bagActions = bagSlice.actions