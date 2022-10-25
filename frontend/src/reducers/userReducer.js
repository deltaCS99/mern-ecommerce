import {createSlice } from '@reduxjs/toolkit'
import {login} from '../services'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo:localStorage.getItem('userInfo')? JSON.parse(localStorage.getItem('userInfo')):null,
    loading:false,
    error:false
  },
  reducers:{
    logOut: (state,action) => {
      localStorage.removeItem('userInfo')
      state.userInfo = null
    }
  },
  extraReducers: (builder)=> {
    builder.addCase(login.fulfilled,(state, action)=>{
      state.userInfo = action.payload
      state.loading = false
    })
    .addCase(login.rejected, (state,action) =>{
      state.userInfo = null
      state.error = action.payload
      state.loading = false;
    })
    .addCase(login.pending,(state, action) =>{
      state.loading = true
    })
  }
}
)

export const {logOut} = userSlice.actions
export default userSlice.reducer