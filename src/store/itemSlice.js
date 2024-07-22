import { createSlice } from '@reduxjs/toolkit'

const itemSlice = createSlice({
    name: 'items',
    initialState: [

    ],

    reducers: {
        initialValue: (state, action) => {
            return action.payload
        }
    }
})

export default itemSlice
export const itemsActions = itemSlice.actions