import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import config from "../../../../config/api";
import useAxios from "../../../hooks/UseAxios";

export const allUsers = createAsyncThunk(
    "users/getAllUsers",
    async (data, thunkAPI) => {
        try {
            const response = await useAxios({
                url: `${config.API_BASE_URL}/admin/users`,
                method: "get",
            })
            console.log(response.data, "hello")
            return response.data.data
        } catch (error) {
            console.log(error.response.data.meta.error, "deletion")
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