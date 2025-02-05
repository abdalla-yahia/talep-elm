import { createSlice } from "@reduxjs/toolkit";
import {forgetPassword,veifyCode,resetPassword} from '../Actions/ForgetPasswordActions';

const initialState = {
    forgetpass:{},
    VerifyCode:{},
    ResetPassword:{},
    loading:false,
    error:null as unknown
}

const forgetPasswordSlice = createSlice({
    name: 'forgetpassword',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder

        .addCase(forgetPassword.pending, (state) => {
            state.loading = true
        })
        .addCase(forgetPassword.fulfilled, (state, action) => {
            state.loading = false
            state.forgetpass = action.payload as unknown as string
        })
        .addCase(forgetPassword.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })

        .addCase(veifyCode.pending, (state) => {
            state.loading = true
        })
        .addCase(veifyCode.fulfilled, (state, action) => {
            state.loading = false
            state.VerifyCode = action.payload as unknown as string
        })
        .addCase(veifyCode.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })

        .addCase(resetPassword.pending, (state) => {
            state.loading = true
        })
        .addCase(resetPassword.fulfilled, (state, action) => {
            state.loading = false
            state.ResetPassword = action.payload as unknown as string
        })
        .addCase(resetPassword.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })

    }
}) 


export default forgetPasswordSlice.reducer;