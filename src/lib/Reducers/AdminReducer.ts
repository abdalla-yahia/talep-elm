import { createSlice } from "@reduxjs/toolkit";
import { fetchAllAdmins, fetchAdminById,createAdmin ,LoginAdmin, LogOutAdmin,updateAdmin,deleteAdmin } from "../Actions/AdminsActions";
import { Admins } from "@prisma/client";

const initialState ={
    AllAdmins:[],
    Admin:{},
    CreateAdmin:{} as Admins,
    UpdateAdmin:{} as Admins,
    DeleteAdmin:{} as Admins,
    loginAdmin:[] as unknown as Admins,
    logoutAdmin:{},
    AdminLogedData:[],
    loading:false,
    error:null as unknown
}

const adminslice = createSlice({
    name:'Admin',
    initialState,
    reducers:{
        setAdminData:(state,action)=>{
            return { ...state,AdminLogedData:action.payload}
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllAdmins.pending,(state)=>{  
            state.loading=true
            })
        .addCase(fetchAllAdmins.fulfilled,(state,action)=>{
        state.AllAdmins=action.payload
        state.loading=false
        })
        .addCase(fetchAllAdmins.rejected,(state,action)=>{
        state.error = action.payload
        state.loading=false
        })
        
        .addCase(fetchAdminById.pending , (state)=>{
            state.loading=true
        })
        .addCase(fetchAdminById.fulfilled , (state,action)=>{
            state.Admin=action.payload
            state.loading=false
        })
        .addCase(fetchAdminById.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
            })
        
        
        .addCase(createAdmin.pending , (state)=>{
            state.loading=true
        })
        .addCase(createAdmin.fulfilled , (state,action)=>{
            state.CreateAdmin=action.payload as unknown as Admins
            state.loading=false
        })
        .addCase(createAdmin.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
            })
        
        
        .addCase(updateAdmin.pending , (state)=>{
            state.loading=true
        })
        .addCase(updateAdmin.fulfilled , (state,action)=>{
            state.UpdateAdmin=action.payload as unknown as Admins
            state.loading=false
        })
        .addCase(updateAdmin.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
            })
        
        
        .addCase(deleteAdmin.pending , (state)=>{
            state.loading=true
        })
        .addCase(deleteAdmin.fulfilled , (state,action)=>{
            state.DeleteAdmin=action.payload
            state.loading=false
        })
        .addCase(deleteAdmin.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
            })
        
        .addCase(LoginAdmin.pending , (state)=>{
            state.loading=true
        })
        .addCase(LoginAdmin.fulfilled , (state,action)=>{
            state.loginAdmin=action.payload
            state.loading=false
        })
        .addCase(LoginAdmin.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
        })

        .addCase(LogOutAdmin.pending , (state)=>{
            state.loading=true
        })
        .addCase(LogOutAdmin.fulfilled , (state)=>{
            state.logoutAdmin={}
            state.loading=false
        })
        .addCase(LogOutAdmin.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
            })
       
        }
        })


export default adminslice.reducer
export const {setAdminData} = adminslice.actions;