import {createSlice } from '@reduxjs/toolkit'
import {getProduct} from '../services'

const productSlice = createSlice({
  name: 'product',
  initialState: {
    product:{
        reviews:[]
    },
    loading:false,
    error:false
  },
  reducers:{
    
  },
  extraReducers: (builder)=> {
    builder.addCase(getProduct.fulfilled,(state, action)=>{
      state.product = action.payload
      state.loading = false
    })
    .addCase(getProduct.rejected, (state,action) =>{
      state.product = {reviews:[] }
      state.error = action.error
      state.loading = false;
    })
    .addCase(getProduct.pending,(state, action) =>{
      state.loading = true
    })
  }
}
)

//export const {productsAdded} = productSlice.actions
export default productSlice.reducer