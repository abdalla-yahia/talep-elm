import { createSlice } from "@reduxjs/toolkit";
import { fetchAllOwners, fetchOwnerById,createOwner ,LoginOwner, LogOutOwner,updateOwner,deleteOwner } from "../Actions/OwnersActions";
import { Owner } from "@prisma/client";

const initialState ={
    AllOwners:[],
    Owner:{},
    CreateOwner:{},
    loginOwner:[],
    logoutOwner:{},
    UpdateOwner:{},
    DeleteOwner:{},
    OwnerLogedData:[],
    loading:false,
    error:null as unknown
}

const Ownerslice = createSlice({
    name:'Owner',
    initialState,
    reducers:{
        setOwnerData:(state,action)=>{
            return { ...state,OwnerLogedData:action.payload}
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllOwners.pending,(state)=>{  
            state.loading=true
            })
        .addCase(fetchAllOwners.fulfilled,(state,action)=>{
        state.AllOwners=action.payload
        state.loading=false
        })
        .addCase(fetchAllOwners.rejected,(state,action)=>{
        state.error = action.payload
        state.loading=false
        })
        
        .addCase(fetchOwnerById.pending , (state)=>{
            state.loading=true
        })
        .addCase(fetchOwnerById.fulfilled , (state,action)=>{
            state.Owner=action.payload
            state.loading=false
        })
        .addCase(fetchOwnerById.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
            })
        
        
        .addCase(createOwner.pending , (state)=>{
            state.loading=true
        })
        .addCase(createOwner.fulfilled , (state,action)=>{
            state.CreateOwner=action.payload
            state.loading=false
        })
        .addCase(createOwner.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
            })
        
        .addCase(LoginOwner.pending , (state)=>{
            state.loading=true
        })
        .addCase(LoginOwner.fulfilled , (state,action)=>{
            state.loginOwner=action.payload
            state.loading=false
        })
        .addCase(LoginOwner.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
        })

        .addCase(LogOutOwner.pending , (state)=>{
            state.loading=true
        })
        .addCase(LogOutOwner.fulfilled , (state)=>{
            state.logoutOwner={}
            state.loading=false
        })
        .addCase(LogOutOwner.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
            })
       

        .addCase(updateOwner.pending , (state)=>{
            state.loading=true
        })
        .addCase(updateOwner.fulfilled , (state,action)=>{
            state.UpdateOwner=action.payload as unknown as Owner
            state.loading=false
        })
        .addCase(updateOwner.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
            })
       

        .addCase(deleteOwner.pending , (state)=>{
            state.loading=true
        })
        .addCase(deleteOwner.fulfilled , (state)=>{
            state.DeleteOwner={}
            state.loading=false
        })
        .addCase(deleteOwner.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
            })
       
        }
        })


export default Ownerslice.reducer
export const {setOwnerData} = Ownerslice.actions;