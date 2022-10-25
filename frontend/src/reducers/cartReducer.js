import {createSlice } from '@reduxjs/toolkit'
import {getCartProduct} from '../services'



const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: localStorage.getItem('cartItems')? JSON.parse(localStorage.getItem('cartItems')): [],
    shippingAddress:localStorage.getItem('shippingAddress')? JSON.parse(localStorage.getItem('shippingAddress')): {},
    paymentMethod:localStorage.getItem('paymentMethod')? JSON.parse(localStorage.getItem('paymentMethod')): '',
    itemsPrice :0,
    shippingPrice:0,
    taxPrice:0,
    totalPrice:0,
    loading:false,
    err:false
  },
  reducers:{
    removeItem: (state,action) => {

      const obj = {
        ...state,
        cartItems: [...state.cartItems.filter(i => i.product !== action.payload)]
      }

      localStorage.setItem('cartItems', JSON.stringify(obj.cartItems))
      return obj
      
    },
    
    saveShippingAddress: (state,action) => {
       const obj = {
        ...state,
        shippingAddress: action.payload
      }

      localStorage.setItem('shippingAddress', JSON.stringify(action.payload))
      return obj
    },
    
    savePaymentMethod: (state,action) => {
       const obj = {
        ...state,
        paymentMethod: action.payload
      }

      localStorage.setItem('paymentMethod', JSON.stringify(action.payload))
      return obj
    }
  },
  extraReducers: (builder)=> {
    builder.addCase(getCartProduct.fulfilled,(state, action)=>{

      const item = action.payload

      const existItem = state.cartItems.find(i => i.product === item.product)

      if(existItem){

        const obj = {
          ...state,loading:false,
          cartItems:state.cartItems.map(i => i.product === existItem.product ? item : i)
        }

        localStorage.setItem('cartItems', JSON.stringify(obj.cartItems))
        return obj
      }else{
        const obj = {
          ...state,loading:false,
          cartItems: [...state.cartItems, item]
        }
        localStorage.setItem('cartItems', JSON.stringify(obj.cartItems))

        return obj
      }
    })
    .addCase(getCartProduct.rejected, (state,action) =>{
      state.cartItems = []
      state.err = action.error
      state.loading = false;
    })
    .addCase(getCartProduct.pending,(state, action) =>{
      state.loading = true
    })
  }
}
)

export const {removeItem, saveShippingAddress, savePaymentMethod} = cartSlice.actions
export default cartSlice.reducer