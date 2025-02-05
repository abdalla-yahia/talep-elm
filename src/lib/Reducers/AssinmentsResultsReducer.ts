import { createSlice } from "@reduxjs/toolkit";
import { fetchAssinmentsResults, fetchAssinmentResultByID, createAssinmentResult,updateAssinmentResult,deleteAssinmentResult } from "../Actions/AssinmentsResultsActions";
import { AssinmentResult } from "@prisma/client";

const initialState = {
    AllAssinmentsResults:[],
    AssinmentResult:{},
    UpdateAssinmentResult:{},
    DeleteAssinmentResult:{},
    loading:false,
    error:null as unknown
}

const assinmentSkice = createSlice({
    name:'subjects',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        
        .addCase(fetchAssinmentsResults.pending,(state)=>{
            state.loading=true
            })
        .addCase(fetchAssinmentsResults.fulfilled,(state,action)=>{
            state.AllAssinmentsResults=action.payload
            state.loading=false
            })
        .addCase(fetchAssinmentsResults.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(fetchAssinmentResultByID.pending,(state)=>{
            state.loading=true
            })
        .addCase(fetchAssinmentResultByID.fulfilled,(state,action)=>{
            state.AssinmentResult=action.payload
            state.loading=false
            })
        .addCase(fetchAssinmentResultByID.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(createAssinmentResult.pending,(state)=>{
            state.loading=true
            })
        .addCase(createAssinmentResult.fulfilled,(state,action)=>{
            state.AssinmentResult=action.payload as unknown as AssinmentResult
            state.loading=false
            })
        .addCase(createAssinmentResult.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(updateAssinmentResult.pending,(state)=>{
            state.loading=true
            })
        .addCase(updateAssinmentResult.fulfilled,(state,action)=>{
            state.UpdateAssinmentResult=action.payload as unknown as AssinmentResult
            state.loading=false
            })
        .addCase(updateAssinmentResult.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(deleteAssinmentResult.pending,(state)=>{
            state.loading=true
            })
        .addCase(deleteAssinmentResult.fulfilled,(state,action)=>{
            state.DeleteAssinmentResult=action.payload as unknown as AssinmentResult
            state.loading=false
            })
        .addCase(deleteAssinmentResult.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })


            }
            })
export default assinmentSkice.reducer;

