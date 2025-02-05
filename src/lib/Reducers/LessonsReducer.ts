import { createSlice } from "@reduxjs/toolkit";
import { fetchAllLesson, fetchLessonById,createLesson,updateLesson,deleteLesson } from "../Actions/LessonsActions";

const initialState = {
    Lessons:[],
    LessonByID:{},
    CreateLesson:{},
    UpdateLesson:{},
    DeleteLesson:{},
    loading:false,
    error:null as unknown
}

const LessonSlice = createSlice({
    name:'Lesson',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllLesson.pending,(state)=>{
        state.loading = true
        state.error = null
        })
        .addCase(fetchAllLesson.fulfilled,(state,action)=>{
        state.loading = false
        state.Lessons = action.payload
        })
        .addCase(fetchAllLesson.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload
        })
        
        .addCase(fetchLessonById.pending,(state)=>{
        state.loading = true
        state.error = null
        })
        .addCase(fetchLessonById.fulfilled,(state,action)=>{
        state.loading = false
        state.LessonByID = action.payload
        })
        .addCase(fetchLessonById.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload
        })
        
        .addCase(createLesson.pending,(state)=>{
        state.loading = true
        state.error = null
        })
        .addCase(createLesson.fulfilled,(state,action)=>{
        state.loading = false
        state.CreateLesson = action.payload
        })
        .addCase(createLesson.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload
        })
        
        .addCase(updateLesson.pending,(state)=>{
        state.loading = true
        state.error = null
        })
        .addCase(updateLesson.fulfilled,(state,action)=>{
        state.loading = false
        state.UpdateLesson = action.payload
        })
        .addCase(updateLesson.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload
        })
        
        .addCase(deleteLesson.pending,(state)=>{
        state.loading = true
        state.error = null
        })
        .addCase(deleteLesson.fulfilled,(state,action)=>{
        state.loading = false
        state.DeleteLesson = action.payload
        })
        .addCase(deleteLesson.rejected,(state,action)=>{
        state.loading = false
        state.error = action.payload
        })


}
})
export default LessonSlice.reducer
