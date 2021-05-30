import { createSlice } from '@reduxjs/toolkit'

export const mainSlice = createSlice({
    name: 'main',
    initialState: {
        address: null,
        isConnected: false,
    },
    reducers: {
        setAddress: (state, action) => {
            state.address = action.payload
        },
        setStatus: (state, action) => {
            state.isConnected = action.payload
        },
    },
})

export const { setAddress, setStatus} = mainSlice.actions

export default mainSlice.reducer

