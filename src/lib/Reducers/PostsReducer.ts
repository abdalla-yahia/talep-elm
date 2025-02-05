import { createSlice } from "@reduxjs/toolkit";
import { fetchPosts, fetchPostByID, createPost, updatePost,deletePost } from "../Actions/PostsActions";

const initialState = {
    AllPosts:[],
    Post:{},
    CreatePost:{},
    DeletePost:{},
    UpdatePost:{},
    loading:false,
    error:null as unknown
}

const Postslice = createSlice({
    name:'Posts',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        
        .addCase(fetchPosts.pending,(state)=>{
            state.loading=true
            })
        .addCase(fetchPosts.fulfilled,(state,action)=>{
            state.AllPosts=action.payload
            state.loading=false
            })
        .addCase(fetchPosts.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(fetchPostByID.pending,(state)=>{
            state.loading=true
            })
        .addCase(fetchPostByID.fulfilled,(state,action)=>{
            state.Post=action.payload
            state.loading=false
            })
        .addCase(fetchPostByID.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(createPost.pending,(state)=>{
            state.loading=true
            })
        .addCase(createPost.fulfilled,(state,action)=>{
            state.CreatePost=action.payload
            state.loading=false
            })
        .addCase(createPost.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(updatePost.pending,(state)=>{
            state.loading=true
            })
        .addCase(updatePost.fulfilled,(state,action)=>{
            state.UpdatePost=action.payload
            state.loading=false
            })
        .addCase(updatePost.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(deletePost.pending,(state)=>{
            state.loading=true
            })
        .addCase(deletePost.fulfilled,(state,action)=>{
            state.DeletePost=action.payload
            state.loading=false
            })
        .addCase(deletePost.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })


            }
            })
export default Postslice.reducer;