import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import config from "../../../../config/api";
import useAxios from "../../../hooks/UseAxios";

export const drivers = createAsyncThunk(
    "drivers/getAllDrivers",
    async (data, thunkAPI) => {
        try {
            const response = await useAxios({
                url: `${config.API_BASE_URL}/admin/drivers`,
                method: "get",
            })
            console.log(response.data, "hello")
            return response.data.data
        } catch (error) {
            console.log(error.response.data)
            const message = error.response.data.meta.error
            toast.error(message);
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response);
            } else {
                return thunkAPI.rejectWithValue(String(message));
            }
        }
    }


)
export const SuspendDrivers = createAsyncThunk(
    "drivers/suspend-drivers",
    async (data, thunkAPI) => {
        try {
            const response = await useAxios({
                url: `${config.API_BASE_URL}/admin/suspend-user`,
                method: "patch",
                data: data,
            })
            console.log(response.data, "hello")
            toast.success("Account suspended successfully")
            return response.data.data
        } catch (error) {
            console.log(error.response.data.meta.error, "suspension")
            const message = error.response.data.meta.error
            toast.error(message);
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response);
            } else {
                return thunkAPI.rejectWithValue(String(message));
            }
        }
    }


)
export const deleteDrivers = createAsyncThunk(
    "drivers/delete-drivers",
    async (id, thunkAPI) => {
        try {
            const response = await useAxios({
                url: `${config.API_BASE_URL}/admin/delete-user/${id}`,
                method: "delete",
            })
            console.log(response.data, "hello")
            toast.success("Account deleted successfully")
            return response.data.data
        } catch (error) {
            console.log(error.response.data)
            const message = error.response.data.meta.error
            toast.error(message);
            if (axios.isAxiosError(error) && error.response) {
                return thunkAPI.rejectWithValue(error.response);
            } else {
                return thunkAPI.rejectWithValue(String(message));
            }
        }
    }


)
