import { allTransactions } from "./thunkAction"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: "idle",
    getAllTransactions: []
}

const transactionSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //all users
        builder.addCase(allTransactions.pending, (state) => {
            return { ...state, loading: 'pending' }
        });

        builder.addCase(allTransactions.fulfilled, (state, action) => {
            return {
                ...state,
                loading: 'successful',
                getAllTransactions: action.payload
            }
        })

        builder.addCase(allTransactions.rejected, (state, action) => {
            return { ...state, loading: 'failed' }
        });
    }
})
export const transactionReducer = transactionSlice.reducer