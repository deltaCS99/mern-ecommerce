import {createSlice } from '@reduxjs/toolkit'
import {getUserDetails} from '../services'

const userDetailsSlice = createSlice({
  name: 'user',
  initialState: {
    user: localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')):null,
    loading:false,
    error:false
  },
  reducers:{
  },
  extraReducers: (builder)=> {
    builder.addCase(getUserDetails.fulfilled,(state, action)=>{
      state.user = action.payload
      state.loading = false
    })
    .addCase(getUserDetails.rejected, (state,action) =>{
      state.user = null
      state.error = action.payload
      state.loading = false;
    })
    .addCase(getUserDetails.pending,(state, action) =>{
      state.loading = true
    })
  }
}
)

//export const {logOut} = userSlice.actions
export default userDetailsSlice.reducer