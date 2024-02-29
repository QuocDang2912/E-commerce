import { configureStore } from "@reduxjs/toolkit";

import CartReducer from "./CartSlice"
import userReducer from './UserSlice'

export default configureStore({
    reducer: {
        cart: CartReducer,
        user: userReducer
    },
})