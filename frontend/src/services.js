import axios from "axios";
import { createAsyncThunk} from "@reduxjs/toolkit";

const BASE_URL = "https://mern-ecommerce-deltacs99.vercel.app"

export const getProducts = createAsyncThunk(
  'products/getProducts', async ()=> { 
    const {data} = await axios.get(`${BASE_URL}/api/products`)
    return data
})

export const getCatergories = createAsyncThunk(
  'catergories/getCatergories', async () => { 
    const {data} = await axios.get(`${BASE_URL}/api/catergories`)
    return data
})

export const getProduct = createAsyncThunk(
  'product/getProduct', async (id) => { 
    const {data} = await axios.get(`${BASE_URL}/api/products/${id}`)
    return data
})

export const getCartProduct = createAsyncThunk(
  'cart/getCartProduct', async (arg,{getState}) => { 
    const {data} = await axios.get(`${BASE_URL}/api/products/${arg.id}`)
    
    const cartObj = {
      product:data._id,
      name:data.name,
      image: data.image,
      price:data.price,
      countInStock:data.countInStock,
      qty:arg.qty
    }

    return cartObj
})

export const getCatergory = createAsyncThunk(
  'catergory/getCatergory', async (catergory) => { 
    const {data} = await axios.get(`${BASE_URL}/api/catergories/${catergory}`)
    return data
})

export const login = createAsyncThunk(
  'user/login', async (arg, {rejectWithValue}) => { 

    const config = {
      headers:{
        'Content-Type':'application/json'
      }
    }

    try{
    const {data} = await axios.post(`${BASE_URL}/api/users/login`,{ email:arg.email,password:arg.password }, config)
    localStorage.setItem('userInfo', JSON.stringify(data))

    return data
    }
    catch(err){
      return rejectWithValue(err.response.data)
    }
})

export const register = createAsyncThunk(
  'user/register', async (arg, {rejectWithValue, dispatch}) => { 

    const config = {
      headers:{
        'Content-Type':'application/json'
      }
    }

    try{

    const {data} = await axios.post(`${BASE_URL}/api/users`,{ name:arg.name,email:arg.email,password:arg.password }, config)

    dispatch({type:'user/login/fulfilled', payload:data})

    return data
    
    }
    catch(err){
      return rejectWithValue(err.response.data)
    }
})

export const getUserDetails = createAsyncThunk(
  'user/details', async (id, {rejectWithValue, getState}) => { 
    const {user:{userInfo}} = getState()
    const config = {
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${userInfo.token}`
      }
    }

    try{

    const {data} = await axios.get(`${BASE_URL}/api/users/${id}`, config)

    return data
    
    }
    catch(err){
      return rejectWithValue(err.response.data)
    }
})

export const updateUserProfile = createAsyncThunk(
  'user/update', async (user, {rejectWithValue, getState}) => { 
    const {user:{userInfo}} = getState()
    const config = {
      headers:{
        'Content-Type':'application/json',
        Authorization:`Bearer ${userInfo.token}`
      }
    }

    try{

    const {data} = await axios.put(`${BASE_URL}/api/users/profile`, user, config)

    return data
    
    }
    catch(err){
      return rejectWithValue(err.response.data)
    }
})

