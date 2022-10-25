import {createSlice } from '@reduxjs/toolkit'
import {getProducts} from '../services'

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    products:[],
    loading:false,
    error:false
  },
  reducers:{
    
  },
  extraReducers: (builder)=> {
    builder.addCase(getProducts.fulfilled,(state, action)=>{
      state.products = action.payload
      state.loading = false
    })
    .addCase(getProducts.rejected, (state,action) =>{
      state.products = []
      state.error = action.error
      state.loading = false;
    })
    .addCase(getProducts.pending,(state, action) =>{
      state.loading = true
    })
  }
}
)

//export const {productsAdded} = productSlice.actions
export default productsSlice.reducer