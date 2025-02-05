import { createSlice } from "@reduxjs/toolkit";
import { fetchAllLikesComments,fetchLikesCommentById,createLikesComment,deleteLikesComment } from "../Actions/LikesCommentsActions";
import { LikesComment } from "@prisma/client";

const initialState = {
    LikesComments:[],
    Likescomment:{},
    CreateLikesComment:{},
    DeleteLikesComment:{},

    loading:false,
    error:null as unknown
}

const commentsSlice = createSlice({
    name:'comments',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchAllLikesComments.pending,(state)=>{
            state.loading=true
            })
            .addCase(fetchAllLikesComments.fulfilled,(state,action)=>{
            state.loading=false
            state.LikesComments=action.payload
            })
            .addCase(fetchAllLikesComments.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
            })

            .addCase(fetchLikesCommentById.pending, (state) => {
            state.loading=true
            })
            .addCase(fetchLikesCommentById.fulfilled, (state, action) => {
            state.loading=false
            state.Likescomment=action.payload
            })
            .addCase(fetchLikesCommentById.rejected, (state, action) => {
            state.loading=false
            state.error=action.payload
            })

            .addCase(createLikesComment.pending, (state) => {
            state.loading = true
            })
            .addCase(createLikesComment.fulfilled, (state, action) => {
            state.loading = false
            state.CreateLikesComment= action.payload as unknown as LikesComment
            })
            .addCase(createLikesComment.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            })

            .addCase(deleteLikesComment.pending, (state) => {
            state.loading = true
            })
            .addCase(deleteLikesComment.fulfilled, (state, action) => {
            state.loading = false
            state.DeleteLikesComment = action.payload
            })
            .addCase(deleteLikesComment.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            })


}
})
export default commentsSlice.reducer;
