import { createSlice } from '@reduxjs/toolkit'

export interface CounterState {
  cart: any
  totalCart: number
}
const initialState: CounterState = {
  cart: [],
  totalCart: 0
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    fetApiCArt: (state, action) => {
      console.log(1)

      state.cart = action.payload
      console.log(state)
    },
    setTotalCart: (state, action) => {
      state.totalCart = action.payload
    },
    resetCart: (state) => {
      console.log('abc')

      state.cart = []
      state.totalCart = 0
    }
  }
})

export const { fetApiCArt, resetCart, setTotalCart } = cartSlice.actions

export default cartSlice.reducer
