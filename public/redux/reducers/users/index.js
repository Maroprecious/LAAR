import { allUsers } from "./thunkAction"
import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    loading: "idle",
    getAllUsers: []
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //all users
        builder.addCase(allUsers.pending, (state) => {
            return { ...state, loading: 'pending' }
        });

        builder.addCase(allUsers.fulfilled, (state, action) => {
            return {
                ...state,
                loading: 'successful',
                getAllUsers: action.payload
            }
        })

        builder.addCase(allUsers.rejected, (state, action) => {
            return { ...state, loading: 'failed' }
        });
    }
})
export const userReducer = userSlice.reducer