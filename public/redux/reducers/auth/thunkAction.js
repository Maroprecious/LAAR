import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import config from "../../../../config/api";
import useAxios from "../../../hooks/UseAxios";

export const signUp = createAsyncThunk(
  "auth/signup",
  async (data, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${config.API_BASE_URL}/admin/sign-up`,
        method: "post",
       data: data,
      });

      console.log(response.data, "hello")
      return data
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
);

export const login = createAsyncThunk(
  "auth/login",
  async (data, thunkAPI) => {
    try {
      const response = await useAxios({
        url: `${config.API_BASE_URL}/admin/login`,
        method: "post",
        data: data,
      });


      console.log(response.data, "hello")
      localStorage.setItem('token', response.data.token)
      console.log(response.data.token, "HEY" )
      return data
    } catch (error) {
      
  
      if (axios.isAxiosError(error) && error.response) {
        console.log(error.response.data)
        const message = error.response.data.meta.error
        toast.error(message);
        return thunkAPI.rejectWithValue(error.response);
      } else {
        return thunkAPI.rejectWithValue(String(message));
      }
    }
  }
);




// export const checksuername = createAsyncThunk(
//   "auth/checkusername",
//   async (username: string, thunkAPI) => {
//     try {
//       const response = await useAxios({
//         url: `${config.API_BASE_URL}/check-username`,
//         method: "post",
//         params: {
//           username
//         }
//       });
//       const authData = response.data.message;
    
//       return authData
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         const msg = error.response.data.message as string || 'An error occured, please try again'
//         // toast.error(msg);
//         return thunkAPI.rejectWithValue(msg);
//       } else {
//         return thunkAPI.rejectWithValue(String(error));
//       }
//     }
//   }
// );



// export const checkreferer = createAsyncThunk(
//   "auth/checkreferer",
//   async (username: string, thunkAPI) => {
//     try {
//       const response = await useAxios({
//         url: `${config.API_BASE_URL}/check-referrer`,
//         method: "post",
//         data: { username }
//       });
//       const authData = response.data.message;
    
//       return authData
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         const msg = error.response.data.message as string || 'An error occured, please try again'
//         // toast.error(msg);
//         return thunkAPI.rejectWithValue(msg);
//       } else {
//         return thunkAPI.rejectWithValue(String(error));
//       }
//     }
//   }
// );




// export const verifyotp = createAsyncThunk(
//   "auth/verify",
//   async (data: object, thunkAPI) => {
//     try {
//       const response = await useAxios({
//         url: `${config.API_BASE_URL}/verify-email-otp`,
//         method: "post",
//         params: data
//       });
//       const authData = response.data.message;
//       console.log(response)
//       return authData
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         const msg = error.response.data.message as string || 'An error occured, please try again'
//         toast.error(msg);
//         return thunkAPI.rejectWithValue(msg);
//       } else {
//         return thunkAPI.rejectWithValue(String(error));
//       }
//     }
//   }
// );


// export const sendOtp = createAsyncThunk(
//   "auth/sendotp",
//   async (email: string, thunkAPI) => {
//     try {
//       const response = await useAxios({
//         url: `${config.API_BASE_URL}/resend-email-otp`,
//         method: "post",
//         params: {
//           email
//         }
//       });
//       const authData = response.data.message;
//       console.log("response", response)
//       return authData
//     } catch (error) {
//       console.log("response", error)
//       if (axios.isAxiosError(error) && error.response) {
//         const msg = error.response.data.message as string || 'An error occured, please try again'
//         toast.error(msg);
//         return thunkAPI.rejectWithValue(msg);
//       } else {
//         return thunkAPI.rejectWithValue(String(error));
//       }
//     }
//   }
// );


// export const forgotPassword = createAsyncThunk(
//   "auth/forgotpassword",
//   async (email: string, thunkAPI) => {
//     try {
//       const response = await useAxios({
//         url: `${config.API_BASE_URL}/forgot-email-password`,
//         method: "post",
//         params: {
//           email
//         }
//       });
//       const authData = response.data.message;
//       console.log("response", response)
//       return authData
//     } catch (error) {
//       console.log("response", error)
//       if (axios.isAxiosError(error) && error.response) {
//         const msg = error.response.data.message as string || 'An error occured, please try again'
//         toast.error(msg);
//         return thunkAPI.rejectWithValue(msg);
//       } else {
//         return thunkAPI.rejectWithValue(String(error));
//       }
//     }
//   }
// );


// export const resetPassword = createAsyncThunk(
//   "auth/resetPassword",
//   async (data: object, thunkAPI) => {
//     try {
//       const response = await useAxios({
//         url: `${config.API_BASE_URL}/reset-password`,
//         method: "post",
//         params: data
//       });
//       const authData = response.data.message;
//       console.log("response", response)
//       return authData
//     } catch (error) {
//       console.log("response", error)
//       if (axios.isAxiosError(error) && error.response) {
//         const msg = error.response.data.message as string || 'An error occured, please try again'
//         toast.error(msg);
//         return thunkAPI.rejectWithValue(msg)
//       } else {
//         return thunkAPI.rejectWithValue(String(error));
//       }
//     }
//   }
// );


// export const loginNofitication = createAsyncThunk(
//   "auth/loginNofitication",
//   async (data: object, thunkAPI) => {
//     try {
//       const response = await useAxios({
//         url: `${config.API_BASE_URL}/notify-login`,
//         method: "post",
//         params: data
//       });
//       const authData = response.data.message;
//       console.log("response", response)
//       return authData
//     } catch (error) {
//       console.log("response", error)
//       if (axios.isAxiosError(error) && error.response) {
//         const msg = error.response.data.message as string || 'An error occured, please try again'
//         toast.error(msg);
//         return thunkAPI.rejectWithValue(msg)
//       } else {
//         return thunkAPI.rejectWithValue(String(error));
//       }
//     }
//   }
// );


// export const getHomeData = createAsyncThunk(
//   "auth/getHomeData",
//   async (data: object, thunkAPI) => {
//     try {
//       const response = await useAxios({
//         url: `${config.API_BASE_URL}/home`,
//         method: "get",
//       });
//       const authData = response.data;
//       console.log("response", response)
//       return authData
//     } catch (error) {
//       console.log("response", error)
//       if (axios.isAxiosError(error) && error.response) {
//         const msg = error.response.data.message as string || 'An error occured, please try again'
//         toast.error(msg);
//         return thunkAPI.rejectWithValue(msg)
//       } else {
//         return thunkAPI.rejectWithValue(String(error));
//       }
//     }
//   }
// );


// export const updatePassword = createAsyncThunk(
//   "auth/updatePassword",
//   async (data: object, thunkAPI) => {
//     try {
//       const response = await useAxios({
//         url: `${config.API_BASE_URL}/update-password`,
//         method: "post",
//         params: data
//       });
//       const authData = response.data.message;
//       console.log("response", response)
//       return authData
//     } catch (error) {
//       console.log("response", error)
//       if (axios.isAxiosError(error) && error.response) {
//         const msg = error.response.data.message as string || 'An error occured, please try again'
//         toast.error(msg);
//         return thunkAPI.rejectWithValue(msg)
//       } else {
//         return thunkAPI.rejectWithValue(String(error));
//       }
//     }
//   }
// );
