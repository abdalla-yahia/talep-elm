import { createSlice } from "@reduxjs/toolkit";
import { fetchCodes, fetchCodesByID, createCodes, updateCodes,deleteCodes,deleteCodesById } from "../Actions/CodesActions";
import { Codes } from "@prisma/client";

const initialState = {
    AllCodes:[],
    Codes:{},
    CreateCodes:{},
    DeleteCodes:{},
    UpdateCodes:{},
    loading:false,
    error:null as unknown
}

const Codeslice = createSlice({
    name:'Codes',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        
        .addCase(fetchCodes.pending,(state)=>{
            state.loading=true
            })
        .addCase(fetchCodes.fulfilled,(state,action)=>{
            state.AllCodes=action.payload
            state.loading=false
            })
        .addCase(fetchCodes.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(fetchCodesByID.pending,(state)=>{
            state.loading=true
            })
        .addCase(fetchCodesByID.fulfilled,(state,action)=>{
            state.Codes=action.payload
            state.loading=false
            })
        .addCase(fetchCodesByID.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(createCodes.pending,(state)=>{
            state.loading=true
            })
        .addCase(createCodes.fulfilled,(state,action)=>{
            state.CreateCodes=action.payload
            state.loading=false
            })
        .addCase(createCodes.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(updateCodes.pending,(state)=>{
            state.loading=true
            })
        .addCase(updateCodes.fulfilled,(state,action)=>{
            state.UpdateCodes=action.payload
            state.loading=false
            })
        .addCase(updateCodes.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(deleteCodes.pending,(state)=>{
            state.loading=true
            })
        .addCase(deleteCodes.fulfilled,(state,action)=>{
            state.DeleteCodes=action.payload as unknown as Codes
            state.loading=false
            })
        .addCase(deleteCodes.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(deleteCodesById.pending,(state)=>{
            state.loading=true
            })
        .addCase(deleteCodesById.fulfilled,(state,action)=>{
            state.DeleteCodes=action.payload as unknown as Codes
            state.loading=false
            })
        .addCase(deleteCodesById.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })


            }
            })
export default Codeslice.reducer;