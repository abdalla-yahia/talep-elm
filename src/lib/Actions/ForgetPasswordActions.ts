import { PostHook, PutHook } from "@/Hook/Custom-Hook";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AxiosRequestConfig } from "axios";

export const forgetPassword = createAsyncThunk('forgetpassword/sendmail', async (data:{email:string,Role:string})=>{
    try {
        const res =  await PostHook('/api/v1/forgetpassword',data as unknown as AxiosRequestConfig)
        return res;
    } catch (error) {
        return error
    }
})

export const veifyCode = createAsyncThunk('forgetpassword/verifycode' , async (code:{code:string})=>{
    try {
        const res =  await PostHook('/api/v1/forgetpassword/verify-code',code as unknown as AxiosRequestConfig)
        return res;
        } catch (error) {
            return error
            }
})

export const resetPassword = createAsyncThunk('forgetpassword/resetpassword', async (data:{newPassword:string})=>{
    try {
        const res =  await PutHook('/api/v1/forgetpassword/updatepassword',data as unknown as AxiosRequestConfig)
        return res;
        } catch (error) {
            return error
            }
})