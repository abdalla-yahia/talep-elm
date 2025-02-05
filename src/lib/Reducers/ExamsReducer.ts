import { createSlice } from "@reduxjs/toolkit";
import { fetchExams, fetchExamByID,createExam,updateExam,deleteExam } from "../Actions/ExamsActions";
import { updateExamResult } from "../Actions/ExamsResultsActions";
import { Exam } from "@prisma/client";

const initialState = {
    AllExams:[],
    Exam:{},
    CreatedExam:{},
    UpdatedExam:{},
    DeletedExam:{},
    loading:false,
    error:null as unknown
}

const examslice = createSlice({
    name:'exams',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        
        .addCase(fetchExams.pending,(state)=>{
            state.loading=true
            })
        .addCase(fetchExams.fulfilled,(state,action)=>{
            state.AllExams=action.payload
            state.loading=false
            })
        .addCase(fetchExams.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(fetchExamByID.pending,(state)=>{
            state.loading=true
            })
        .addCase(fetchExamByID.fulfilled,(state,action)=>{
            state.Exam=action.payload
            state.loading=false
            })
        .addCase(fetchExamByID.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(updateExamResult.pending,(state)=>{
            state.loading=true
            })
        .addCase(updateExamResult.fulfilled,(state,action)=>{
            state.Exam=action.payload as unknown as Exam
            state.loading=false
            })
        .addCase(updateExamResult.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(createExam.pending,(state)=>{
            state.loading=true
            })
        .addCase(createExam.fulfilled,(state,action)=>{
            state.CreatedExam=action.payload
            state.loading=false
            })
        .addCase(createExam.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(updateExam.pending,(state)=>{
            state.loading=true
            })
        .addCase(updateExam.fulfilled,(state,action)=>{
            state.UpdatedExam=action.payload
            state.loading=false
            })
        .addCase(updateExam.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(deleteExam.pending,(state)=>{
            state.loading=true
            })
        .addCase(deleteExam.fulfilled,(state,action)=>{
            state.DeletedExam=action.payload
            state.loading=false
            })
        .addCase(deleteExam.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })


            }
            })
export default examslice.reducer;

