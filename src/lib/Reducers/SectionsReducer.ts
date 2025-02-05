import { createSlice } from "@reduxjs/toolkit";
import { fetchSections, fetchSectionByID, createSection, updateSection, deleteSection } from "../Actions/SectionsActions";

const initialState = {
    AllSections:[],
    Section:{},
    CreateSection:{},
    DeleteSection:{},
    UpdateSection:{},
    loading:false,
    error:null as unknown
}

const sectionslice = createSlice({
    name:'Sections',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        
        .addCase(fetchSections.pending,(state)=>{
            state.loading=true
            })
        .addCase(fetchSections.fulfilled,(state,action)=>{
            state.AllSections=action.payload
            state.loading=false
            })
        .addCase(fetchSections.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(fetchSectionByID.pending,(state)=>{
            state.loading=true
            })
        .addCase(fetchSectionByID.fulfilled,(state,action)=>{
            state.Section=action.payload
            state.loading=false
            })
        .addCase(fetchSectionByID.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(createSection.pending,(state)=>{
            state.loading=true
            })
        .addCase(createSection.fulfilled,(state,action)=>{
            state.CreateSection=action.payload
            state.loading=false
            })
        .addCase(createSection.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(updateSection.pending,(state)=>{
            state.loading=true
            })
        .addCase(updateSection.fulfilled,(state,action)=>{
            state.UpdateSection=action.payload
            state.loading=false
            })
        .addCase(updateSection.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(deleteSection.pending,(state)=>{
            state.loading=true
            })
        .addCase(deleteSection.fulfilled,(state,action)=>{
            state.DeleteSection=action.payload
            state.loading=false
            })
        .addCase(deleteSection.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })


            }
            })
export default sectionslice.reducer;