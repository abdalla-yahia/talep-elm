import { createSlice } from "@reduxjs/toolkit";
import { fetchAllTeachers, fetchTeacherById ,LoginTeacher,createTeacher, LogOutTeacher,updateTeacher,deleteTeacher } from "../Actions/TeachersActions";
import { Teachers } from "@prisma/client";

const initialState ={
    AllTeachers:[],
    Teacher:{},
    CreateTeacher:{},
    UpdateTeacher:{} ,
    DeleteTeacher:{},
    loginTeacher:[],
    logoutTeacher:{},
    TeacherLogedData:[],
    loading:false,
    error:null as unknown
}

const teacherslice = createSlice({
    name:'Teacher',
    initialState,
    reducers:{
        setTeacherData:(state,action)=>{
            return { ...state,TeacherLogedData:action.payload}
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllTeachers.pending,(state)=>{  
            state.loading=true
            })
        .addCase(fetchAllTeachers.fulfilled,(state,action)=>{
        state.AllTeachers=action.payload
        state.loading=false
        })
        .addCase(fetchAllTeachers.rejected,(state,action)=>{
        state.error = action.payload
        state.loading=false
        })
        
        .addCase(fetchTeacherById.pending , (state)=>{
            state.loading=true
        })
        .addCase(fetchTeacherById.fulfilled , (state,action)=>{
            state.Teacher=action.payload
            state.loading=false
        })
        .addCase(fetchTeacherById.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
            })
        
        
        .addCase(createTeacher.pending , (state)=>{
            state.loading=true
        })
        .addCase(createTeacher.fulfilled , (state,action)=>{
            state.CreateTeacher=action.payload
            state.loading=false
        })
        .addCase(createTeacher.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
            })
        
        
        .addCase(updateTeacher.pending , (state)=>{
            state.loading=true
        })
        .addCase(updateTeacher.fulfilled , (state,action)=>{
            state.UpdateTeacher=action.payload as unknown as Teachers
            state.loading=false
        })
        .addCase(updateTeacher.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
            })
        
        
        .addCase(deleteTeacher.pending , (state)=>{
            state.loading=true
        })
        .addCase(deleteTeacher.fulfilled , (state,action)=>{
            state.DeleteTeacher=action.payload
            state.loading=false
        })
        .addCase(deleteTeacher.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
            })
        
        .addCase(LoginTeacher.pending , (state)=>{
            state.loading=true
        })
        .addCase(LoginTeacher.fulfilled , (state,action)=>{
            state.loginTeacher=action.payload
            state.loading=false
        })
        .addCase(LoginTeacher.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
        })

        .addCase(LogOutTeacher.pending , (state)=>{
            state.loading=true
        })
        .addCase(LogOutTeacher.fulfilled , (state)=>{
            state.logoutTeacher={}
            state.loading=false
        })
        .addCase(LogOutTeacher.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
            })
       
        }
        })


export default teacherslice.reducer
export const {setTeacherData} = teacherslice.actions;