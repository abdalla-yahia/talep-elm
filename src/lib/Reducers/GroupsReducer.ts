import { createSlice } from "@reduxjs/toolkit";
import { fetchGroups, fetchGroupByID, createGroup, updateGroup,deleteGroup } from "../Actions/GroupsActions";

const initialState = {
    AllGroups:[],
    Group:{},
    CreateGroup:{},
    DeleteGroup:{},
    UpdateGroup:{},
    loading:false,
    error:null as unknown
}

const groupslice = createSlice({
    name:'groups',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        
        .addCase(fetchGroups.pending,(state)=>{
            state.loading=true
            })
        .addCase(fetchGroups.fulfilled,(state,action)=>{
            state.AllGroups=action.payload
            state.loading=false
            })
        .addCase(fetchGroups.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(fetchGroupByID.pending,(state)=>{
            state.loading=true
            })
        .addCase(fetchGroupByID.fulfilled,(state,action)=>{
            state.Group=action.payload
            state.loading=false
            })
        .addCase(fetchGroupByID.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(createGroup.pending,(state)=>{
            state.loading=true
            })
        .addCase(createGroup.fulfilled,(state,action)=>{
            state.CreateGroup=action.payload
            state.loading=false
            })
        .addCase(createGroup.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(updateGroup.pending,(state)=>{
            state.loading=true
            })
        .addCase(updateGroup.fulfilled,(state,action)=>{
            state.UpdateGroup=action.payload
            state.loading=false
            })
        .addCase(updateGroup.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(deleteGroup.pending,(state)=>{
            state.loading=true
            })
        .addCase(deleteGroup.fulfilled,(state,action)=>{
            state.DeleteGroup=action.payload
            state.loading=false
            })
        .addCase(deleteGroup.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })


            }
            })
export default groupslice.reducer;