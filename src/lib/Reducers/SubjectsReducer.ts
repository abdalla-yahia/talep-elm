import { createSlice } from "@reduxjs/toolkit";
import { fetchSubjectByID, fetchSubjects, createSubject,updateSubject,deleteSubject } from "../Actions/SubjectsActions";

const initialState = {
    AllSubjects:[],
    Subject:{},
    CreateSubject:{},
    UpdateSubject:{},
    DeleteSubject:{},
    loading:false,
    error:null as unknown
}

const subjectSlice = createSlice({
    name:'subjects',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        
        .addCase(fetchSubjects.pending,(state)=>{
            state.loading=true
            })
        .addCase(fetchSubjects.fulfilled,(state,action)=>{
            state.AllSubjects=action.payload
            state.loading=false
            })
        .addCase(fetchSubjects.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(fetchSubjectByID.pending,(state)=>{
            state.loading=true
            })
        .addCase(fetchSubjectByID.fulfilled,(state,action)=>{
            state.Subject=action.payload
            state.loading=false
            })
        .addCase(fetchSubjectByID.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(createSubject.pending,(state)=>{
            state.loading=true
            })
        .addCase(createSubject.fulfilled,(state,action)=>{
            state.CreateSubject=action.payload
            state.loading=false
            })
        .addCase(createSubject.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(updateSubject.pending,(state)=>{
            state.loading=true
            })
        .addCase(updateSubject.fulfilled,(state,action)=>{
            state.UpdateSubject=action.payload
            state.loading=false
            })
        .addCase(updateSubject.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(deleteSubject.pending,(state)=>{
            state.loading=true
            })
        .addCase(deleteSubject.fulfilled,(state,action)=>{
            state.DeleteSubject=action.payload
            state.loading=false
            })
        .addCase(deleteSubject.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })


            }
            })
export default subjectSlice.reducer;