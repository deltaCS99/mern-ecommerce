import {createSlice } from '@reduxjs/toolkit'
import {getCatergories} from '../services'

const catergorySlice = createSlice({
  name: 'catergories',
  initialState: {
    catergories:[],
    catLoading:false,
    catError:false
  },
  reducers:{
  },
  extraReducers: (builder)=> {
    builder.addCase(getCatergories.fulfilled,(state, action)=>{
      state.catergories = action.payload
      state.catLoading = false
    })
    .addCase(getCatergories.rejected, (state,action) =>{
      state.error = action.error
      state.catLoading = false;
    })
    .addCase(getCatergories.pending,(state, action) =>{
      state.catLoading = true
    })
  }
}
)

//export const {productsAdded} = productSlice.actions
export default catergorySlice.reducer