import { createSlice } from '@reduxjs/toolkit'

export const mainSlice = createSlice({
    name: 'main',
    initialState: {
        address: null,
        isConnected: false,
        etherBalance: 0
    },
    reducers: {
        setAddress: (state, action) => {
            state.address = action.payload
        },
        setStatus: (state, action) => {
            state.isConnected = action.payload
        },
        setBalance: (state, action) => {
            state.etherBalance = action.payload
        },
    
    },
})

export const { setAddress, setStatus, setBalance} = mainSlice.actions

export default mainSlice.reducer

