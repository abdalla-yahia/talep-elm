import { createSlice } from "@reduxjs/toolkit";
import { fetchAllManagers, fetchManagerById,createManager ,LoginManager, LogOutManager,updateManager,deleteManager } from "../Actions/ManagersActions";
import { Manager } from "@prisma/client";

const initialState ={
    AllManagers:[],
    Manager:{},
    CreateManager:{},
    loginManager:[],
    logoutManager:{},
    UpdateManager:{},
    DeleteManager:{},
    ManagerLogedData:[],
    loading:false,
    error:null as unknown
}

const managerslice = createSlice({
    name:'Manager',
    initialState,
    reducers:{
        setManagerData:(state,action)=>{
            return { ...state,ManagerLogedData:action.payload}
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllManagers.pending,(state)=>{  
            state.loading=true
            })
        .addCase(fetchAllManagers.fulfilled,(state,action)=>{
        state.AllManagers=action.payload
        state.loading=false
        })
        .addCase(fetchAllManagers.rejected,(state,action)=>{
        state.error = action.payload
        state.loading=false
        })
        
        .addCase(fetchManagerById.pending , (state)=>{
            state.loading=true
        })
        .addCase(fetchManagerById.fulfilled , (state,action)=>{
            state.Manager=action.payload
            state.loading=false
        })
        .addCase(fetchManagerById.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
            })
        
        
        .addCase(createManager.pending , (state)=>{
            state.loading=true
        })
        .addCase(createManager.fulfilled , (state,action)=>{
            state.CreateManager=action.payload
            state.loading=false
        })
        .addCase(createManager.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
            })
        
        .addCase(LoginManager.pending , (state)=>{
            state.loading=true
        })
        .addCase(LoginManager.fulfilled , (state,action)=>{
            state.loginManager=action.payload
            state.loading=false
        })
        .addCase(LoginManager.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
        })

        .addCase(LogOutManager.pending , (state)=>{
            state.loading=true
        })
        .addCase(LogOutManager.fulfilled , (state)=>{
            state.logoutManager={}
            state.loading=false
        })
        .addCase(LogOutManager.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
            })
       

        .addCase(updateManager.pending , (state)=>{
            state.loading=true
        })
        .addCase(updateManager.fulfilled , (state,action)=>{
            state.UpdateManager=action.payload as unknown as Manager
            state.loading=false
        })
        .addCase(updateManager.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
            })
       

        .addCase(deleteManager.pending , (state)=>{
            state.loading=true
        })
        .addCase(deleteManager.fulfilled , (state)=>{
            state.DeleteManager={}
            state.loading=false
        })
        .addCase(deleteManager.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
            })
       
        }
        })


export default managerslice.reducer
export const {setManagerData} = managerslice.actions;