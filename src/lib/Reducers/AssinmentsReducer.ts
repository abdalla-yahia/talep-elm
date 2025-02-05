import { createSlice } from "@reduxjs/toolkit";
import { fetchAssinments, fetchAssinmentByID,createAssinment,updateAssinment,deleteAssinment } from "../Actions/AssinmentsActions";
import { updateAssinmentResult } from "../Actions/AssinmentsResultsActions";
import { Assinments } from "@prisma/client";

const initialState = {
    AllAssinments:[],
    Assinment:{},
    CreatedAssinment:{},
    UpdatedAssinment:{} as unknown as Assinments,
    DeletedAssinment:{},
    loading:false,
    error:null as unknown
}

const assinmentSkice = createSlice({
    name:'subjects',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        
        .addCase(fetchAssinments.pending,(state)=>{
            state.loading=true
            })
        .addCase(fetchAssinments.fulfilled,(state,action)=>{
            state.AllAssinments=action.payload
            state.loading=false
            })
        .addCase(fetchAssinments.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(fetchAssinmentByID.pending,(state)=>{
            state.loading=true
            })
        .addCase(fetchAssinmentByID.fulfilled,(state,action)=>{
            state.Assinment=action.payload
            state.loading=false
            })
        .addCase(fetchAssinmentByID.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(updateAssinmentResult.pending,(state)=>{
            state.loading=true
            })
        .addCase(updateAssinmentResult.fulfilled,(state,action)=>{
            state.UpdatedAssinment=action.payload as unknown as Assinments
            state.loading=false
            })
        .addCase(updateAssinmentResult.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(createAssinment.pending,(state)=>{
            state.loading=true
            })
        .addCase(createAssinment.fulfilled,(state,action)=>{
            state.CreatedAssinment=action.payload
            state.loading=false
            })
        .addCase(createAssinment.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(updateAssinment.pending,(state)=>{
            state.loading=true
            })
        .addCase(updateAssinment.fulfilled,(state,action)=>{
            state.UpdatedAssinment=action.payload
            state.loading=false
            })
        .addCase(updateAssinment.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(deleteAssinment.pending,(state)=>{
            state.loading=true
            })
        .addCase(deleteAssinment.fulfilled,(state,action)=>{
            state.DeletedAssinment=action.payload
            state.loading=false
            })
        .addCase(deleteAssinment.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })


            }
            })
export default assinmentSkice.reducer;

