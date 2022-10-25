import {createSlice } from '@reduxjs/toolkit'
import {getCatergory} from '../services'

const productsByCatergorySlice = createSlice({
  name: 'products',
  initialState: {
    productsByCatergory:[],
    loading:false,
    error:false
  },
  reducers:{
    
  },
  extraReducers: (builder)=> {
    builder.addCase(getCatergory.fulfilled,(state, action)=>{
      state.productsByCatergory = action.payload
      state.loading = false
    })
    .addCase(getCatergory.rejected, (state,action) =>{
      state.productsByCatergory = []
      state.error = action.error
      state.loading = false;
    })
    .addCase(getCatergory.pending,(state, action) =>{
      state.loading = true
    })
  }
}
)

//export const {productsAdded} = productSlice.actions
export default productsByCatergorySlice.reducer