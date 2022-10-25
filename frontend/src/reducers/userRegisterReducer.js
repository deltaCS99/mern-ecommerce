import {createSlice } from '@reduxjs/toolkit'
import {register} from '../services'

const userRegisterSlice= createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading:false,
    error:false
  },
  reducers:{
  },
  extraReducers: (builder)=> {
    builder.addCase(register.fulfilled,(state, action)=>{
      state.user = action.payload
      state.loading = false
    })
    .addCase(register.rejected, (state,action) =>{
      state.user = null
      state.error = action.payload
      state.loading = false;
    })
    .addCase(register.pending,(state, action) =>{
      state.loading = true
    })
  }
}
)

//export const {logOut} = userSlice.actions
export default userRegisterSlice.reducer