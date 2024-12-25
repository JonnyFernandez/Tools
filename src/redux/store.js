import { configureStore } from "@reduxjs/toolkit";
import prodReducer from './productSlice'


export const store = configureStore({
    reducer: {
        prod: prodReducer, // 'prod' debe coincidir con el nombre usado en useSelector
    },
})