import { configureStore } from '@reduxjs/toolkit'
import itemSlice from './itemSlice'
import bagSlice from './bagSlics'

const AppStore = configureStore({
    reducer: {
        items: itemSlice.reducer,
        bags: bagSlice.reducer
    }
})


export default AppStore