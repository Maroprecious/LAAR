import { drivers, SuspendDrivers, deleteDrivers } from "./thunkAction";
import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    loading: "idle",
    allDrivers: []
}

const driversSlice = createSlice({
    name: "drivers",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // all drivers
        builder.addCase(drivers.pending, (state) => {
            return { ...state, loading: 'pending' }
        });

        builder.addCase(drivers.fulfilled, (state, action) => {
            return {
                ...state,
                loading: 'successful',
                allDrivers: action.payload
            }
        })

        builder.addCase(drivers.rejected, (state, action) => {
            return { ...state, loading: 'failed' }
        });
        // suspend a driver
        builder.addCase(SuspendDrivers.pending, (state) => {
            return { ...state, loading: 'pending' }
        });

        builder.addCase(SuspendDrivers.fulfilled, (state, action) => {
            return {
                ...state,
                loading: 'successful',
            }
        })

        builder.addCase(SuspendDrivers.rejected, (state, action) => {
            return { ...state, loading: 'failed' }
        })
        // delete a driver
        builder.addCase(deleteDrivers.pending, (state) => {
            return { ...state, loading: 'pending' }
        });

        builder.addCase(deleteDrivers.fulfilled, (state, action) => {
            return {
                ...state,
                loading: 'successful',
            }
        })

        builder.addCase(deleteDrivers.rejected, (state, action) => {
            return { ...state, loading: 'failed' }
        })

    }
})
export const driverReducer = driversSlice.reducer