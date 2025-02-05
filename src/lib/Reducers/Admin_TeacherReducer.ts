import { createSlice } from "@reduxjs/toolkit";
import { fetchAllAdmins_Teachers, fetchAdmin_TeacherById,createAdmin_Teacher ,LoginAdmin_Teacher, LogOutAdmin_Teacher,updateAdmin_Teacher,deleteAdmin_Teacher } from "../Actions/Admins_TeachersActions";
import { AdminTeacher } from "@prisma/client";

const initialState ={
    AllAdmins_Teachers:[] as unknown as AdminTeacher,
    Admin_Teacher:{} as unknown as AdminTeacher,
    CreateAdmin_Teacher:{} as unknown as AdminTeacher,
    UpdateAdmin_Teacher:{} as unknown as AdminTeacher,
    DeleteAdmin_Teacher:{} as unknown as AdminTeacher,
    loginAdmin_Teacher:[] as unknown as AdminTeacher,
    logoutAdmin_Teacher:{} as unknown as AdminTeacher,
    Admin_TeacherLogedData:[] as unknown as AdminTeacher,
    loading:false,
    error:null as unknown
}

const admins_Teacherslice = createSlice({
    name:'Admin_Teacher',
    initialState,
    reducers:{
        setAdmin_TeacherData:(state,action)=>{
            return { ...state,Admin_TeacherLogedData:action.payload}
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllAdmins_Teachers.pending,(state)=>{  
            state.loading=true
            })
        .addCase(fetchAllAdmins_Teachers.fulfilled,(state,action)=>{
        state.AllAdmins_Teachers=action.payload
        state.loading=false
        })
        .addCase(fetchAllAdmins_Teachers.rejected,(state,action)=>{
        state.error = action.payload
        state.loading=false
        })
        
        .addCase(fetchAdmin_TeacherById.pending , (state)=>{
            state.loading=true
        })
        .addCase(fetchAdmin_TeacherById.fulfilled , (state,action)=>{
            state.Admin_Teacher=action.payload
            state.loading=false
        })
        .addCase(fetchAdmin_TeacherById.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
            })
        
        .addCase(createAdmin_Teacher.pending , (state)=>{
            state.loading=true
        })
        .addCase(createAdmin_Teacher.fulfilled , (state,action)=>{
            state.CreateAdmin_Teacher=action.payload
            state.loading=false
        })
        .addCase(createAdmin_Teacher.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
            })
        
        .addCase(LoginAdmin_Teacher.pending , (state)=>{
            state.loading=true
        })
        .addCase(LoginAdmin_Teacher.fulfilled , (state,action)=>{
            state.loginAdmin_Teacher=action.payload
            state.loading=false
        })
        .addCase(LoginAdmin_Teacher.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
        })
        
        .addCase(updateAdmin_Teacher.pending , (state)=>{
            state.loading=true
        })
        .addCase(updateAdmin_Teacher.fulfilled , (state,action)=>{
            state.UpdateAdmin_Teacher=action.payload
            state.loading=false
        })
        .addCase(updateAdmin_Teacher.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
        })
        
        .addCase(deleteAdmin_Teacher.pending , (state)=>{
            state.loading=true
        })
        .addCase(deleteAdmin_Teacher.fulfilled , (state,action)=>{
            state.DeleteAdmin_Teacher=action.payload
            state.loading=false
        })
        .addCase(deleteAdmin_Teacher.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
        })

        .addCase(LogOutAdmin_Teacher.pending , (state)=>{
            state.loading=true
        })
        .addCase(LogOutAdmin_Teacher.fulfilled , (state,action)=>{
            state.loginAdmin_Teacher=action.payload
            state.loading=false
        })
        .addCase(LogOutAdmin_Teacher.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
            })
       
        }
        })


export default admins_Teacherslice.reducer
export const {setAdmin_TeacherData} = admins_Teacherslice.actions;