import { ICart } from '@/interfaces/ICart'
import {  createSlice } from '@reduxjs/toolkit'


export interface CounterState {
  cart: any
}
const initialState: CounterState = {
  cart: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetApiCArt: (state, action) => {
      console.log(action);
      state.cart = action.payload
    },
    addItem: (state, action) => {
      const item = action.payload
      state.cart.content.push(item)
      console.log(state.cart);
    },
    removeItem: (state, action) => {
      const itemId = action.payload
      state.cart = state.cart.filter((item:any) => item.id !== itemId)
    },
    resetCart: (state, action) => {
      console.log(action.payload);
    
      state.cart = action.payload
    }
  }
})

// Action creators are generated for each case reducer function
export const { addItem, removeItem, fetApiCArt,resetCart } = cartSlice.actions

export default cartSlice.reducer
