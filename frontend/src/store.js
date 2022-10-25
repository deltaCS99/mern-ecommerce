import {configureStore } from '@reduxjs/toolkit'
import productsReducer from './reducers/productsSlice'
import catergoryReducer from './reducers/catergoriesSlice'
import productReducer from './reducers/productSlice'
import productsByCatergoryReducer from './reducers/productsByCatergorySlice'
import cartItemsReducer from './reducers/cartReducer'
import userReducer from './reducers/userReducer'
import userRegisterReducer from './reducers/userRegisterReducer'
import userDetailsReducer from './reducers/userDetailsReducer'
import userUpdateProfileReducer from './reducers/userUpdateProfileReducer'


const store = configureStore({
    reducer:{
        productList:productsReducer,
        catergoryList:catergoryReducer,
        productDetails:productReducer,
        productsByCatergoryList:productsByCatergoryReducer,
        cart:cartItemsReducer,
        user: userReducer,
        userRegister:userRegisterReducer,
        userDetails: userDetailsReducer,
        userUpdateProfile:userUpdateProfileReducer
    }
})

export default store