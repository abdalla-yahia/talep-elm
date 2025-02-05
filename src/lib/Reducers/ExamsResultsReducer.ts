import { createSlice } from "@reduxjs/toolkit";
import { fetchExamsResults, fetchExamResultByID, createExamResult,updateExamResult,deleteExamResult } from "../Actions/ExamsResultsActions";
import { ExamResult } from "@prisma/client";

const initialState = {
    AllExamsResults:[],
    ExamResult:{},
    UpdateExamResult:{},
    DeleteExamResult:{},
    loading:false,
    error:null as unknown
}

const ExamSlice = createSlice({
    name:'examresults',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        
        .addCase(fetchExamsResults.pending,(state)=>{
            state.loading=true
            })
        .addCase(fetchExamsResults.fulfilled,(state,action)=>{
            state.AllExamsResults=action.payload
            state.loading=false
            })
        .addCase(fetchExamsResults.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(fetchExamResultByID.pending,(state)=>{
            state.loading=true
            })
        .addCase(fetchExamResultByID.fulfilled,(state,action)=>{
            state.ExamResult=action.payload
            state.loading=false
            })
        .addCase(fetchExamResultByID.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(createExamResult.pending,(state)=>{
            state.loading=true
            })
        .addCase(createExamResult.fulfilled,(state,action)=>{
            state.ExamResult=action.payload as unknown as ExamResult
            state.loading=false
            })
        .addCase(createExamResult.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(updateExamResult.pending,(state)=>{
            state.loading=true
            })
        .addCase(updateExamResult.fulfilled,(state,action)=>{
            state.UpdateExamResult=action.payload as unknown as ExamResult
            state.loading=false
            })
        .addCase(updateExamResult.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(deleteExamResult.pending,(state)=>{
            state.loading=true
            })
        .addCase(deleteExamResult.fulfilled,(state,action)=>{
            state.DeleteExamResult=action.payload as unknown as ExamResult
            state.loading=false
            })
        .addCase(deleteExamResult.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })


            }
            })
export default ExamSlice.reducer;

