import { createSlice } from "@reduxjs/toolkit";
import { fetchAllUsers,fetchAllUsersWithQuery,createUser, fetchUserById ,LoginUser, LogOutUser,updateUser, deleteUser } from "../Actions/UserActions";

const initialState ={
    AllUsers:[],
    AllUsersByPage:[],
    user:{},
    CreateNewUser:{},
    loginUser:[],
    logoutUser:{},
    UserLogedData:[],
    UpdateUser:{},
    DeleteUser:{},
    loading:false,
    error:null as unknown
}

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        setUserData:(state,action)=>{
            return { ...state,UserLogedData:action.payload}
        }
    },
    extraReducers:(builder)=>{
        builder
        .addCase(fetchAllUsers.pending,(state)=>{  
            state.loading=true
            })
        .addCase(fetchAllUsers.fulfilled,(state,action)=>{
        state.AllUsers=action.payload
        state.loading=false
        })
        .addCase(fetchAllUsers.rejected,(state,action)=>{
        state.error = action.payload
        state.loading=false
        })

        .addCase(fetchAllUsersWithQuery.pending,(state)=>{  
            state.loading=true
            })
        .addCase(fetchAllUsersWithQuery.fulfilled,(state,action)=>{
        state.AllUsersByPage=action.payload
        state.loading=false
        })
        .addCase(fetchAllUsersWithQuery.rejected,(state,action)=>{
        state.error = action.payload
        state.loading=false
        })
        

        .addCase(createUser.pending,(state)=>{  
            state.loading=true
            })
        .addCase(createUser.fulfilled,(state,action)=>{
        state.CreateNewUser=action.payload
        state.loading=false
        })
        .addCase(createUser.rejected,(state,action)=>{
        state.error = action.payload
        state.loading=false
        })
        
        .addCase(fetchUserById.pending , (state)=>{
            state.loading=true
        })
        .addCase(fetchUserById.fulfilled , (state,action)=>{
            state.user=action.payload
            state.loading=false
        })
        .addCase(fetchUserById.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
            })
        
        .addCase(LoginUser.pending , (state)=>{
            state.loading=true
        })
        .addCase(LoginUser.fulfilled , (state,action)=>{
            state.loginUser=action.payload
            state.loading=false
        })
        .addCase(LoginUser.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
        })

        .addCase(LogOutUser.pending , (state)=>{
            state.loading=true
        })
        .addCase(LogOutUser.fulfilled , (state)=>{
            state.logoutUser={}
            state.loading=false
        })
        .addCase(LogOutUser.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
            })
       
        .addCase(updateUser.pending , (state)=>{
            state.loading=true
        })
        .addCase(updateUser.fulfilled , (state,action)=>{
            state.UpdateUser=action.payload
            state.loading=false
        })
        .addCase(updateUser.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
            })
       
       
        .addCase(deleteUser.pending , (state)=>{
            state.loading=true
        })
        .addCase(deleteUser.fulfilled , (state,action)=>{
            state.DeleteUser=action.payload
            state.loading=false
        })
        .addCase(deleteUser.rejected , (state,action)=>{
            state.error = action.payload
            state.loading=false
            })
       
        }
        })


export default userSlice.reducer
export const {setUserData} = userSlice.actions;