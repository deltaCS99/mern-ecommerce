import {createSlice } from '@reduxjs/toolkit'
import {updateUserProfile} from '../services'

const userUpdateProfileSlice = createSlice({
  name: 'user',
  initialState: {
    updateUser:null,
    loading:false,
    success:false,
    error:false
  },
  reducers:{
  },
  extraReducers: (builder)=> {
    builder.addCase(updateUserProfile.fulfilled,(state, action)=>{
      state.updateUser = action.payload
      state.success =true
      state.loading = false
    })
    .addCase(updateUserProfile.rejected, (state,action) =>{
      state.updateUser = null
      state.success = false
      state.error = action.payload
      state.loading = false;
    })
    .addCase(updateUserProfile.pending,(state, action) =>{
      state.loading = true
    })
  }
}
)

//export const {logOut} = userSlice.actions
export default userUpdateProfileSlice.reducer