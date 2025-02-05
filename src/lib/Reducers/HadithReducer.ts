import { createSlice } from "@reduxjs/toolkit";
import { fetchHadith, fetchHadithByID, createHadith, updateHadith,deleteHadith } from "../Actions/HadithActions";

const initialState = {
    AllHadith:[],
    Hadith:{},
    CreateHadith:{},
    DeleteHadith:{},
    UpdateHadith:{},
    loading:false,
    error:null as unknown
}

const Hadithlice = createSlice({
    name:'Hadith',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        
        .addCase(fetchHadith.pending,(state)=>{
            state.loading=true
            })
        .addCase(fetchHadith.fulfilled,(state,action)=>{
            state.AllHadith=action.payload
            state.loading=false
            })
        .addCase(fetchHadith.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(fetchHadithByID.pending,(state)=>{
            state.loading=true
            })
        .addCase(fetchHadithByID.fulfilled,(state,action)=>{
            state.Hadith=action.payload
            state.loading=false
            })
        .addCase(fetchHadithByID.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(createHadith.pending,(state)=>{
            state.loading=true
            })
        .addCase(createHadith.fulfilled,(state,action)=>{
            state.CreateHadith=action.payload
            state.loading=false
            })
        .addCase(createHadith.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(updateHadith.pending,(state)=>{
            state.loading=true
            })
        .addCase(updateHadith.fulfilled,(state,action)=>{
            state.UpdateHadith=action.payload
            state.loading=false
            })
        .addCase(updateHadith.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(deleteHadith.pending,(state)=>{
            state.loading=true
            })
        .addCase(deleteHadith.fulfilled,(state,action)=>{
            state.DeleteHadith=action.payload
            state.loading=false
            })
        .addCase(deleteHadith.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })


            }
            })
export default Hadithlice.reducer;