import { createSlice } from "@reduxjs/toolkit";
import { fetchAllComments,fetchCommentById,createComment,updateComment,deleteComment } from "../Actions/CommentsActions";
import { Comments } from "@prisma/client";

const initialState = {
    Comments:[],
    comment:{},
    CreateComment:{},
    Updatecomment:{},
    DeleteComment:{},
    loading:false,
    error:null as unknown
}

const commentsSlice = createSlice({
    name:'comments',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchAllComments.pending,(state)=>{
            state.loading=true
            })
            .addCase(fetchAllComments.fulfilled,(state,action)=>{
            state.loading=false
            state.Comments=action.payload
            })
            .addCase(fetchAllComments.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
            })

            .addCase(fetchCommentById.pending, (state) => {
            state.loading=true
            })
            .addCase(fetchCommentById.fulfilled, (state, action) => {
            state.loading=false
            state.comment=action.payload
            })
            .addCase(fetchCommentById.rejected, (state) => {
            state.loading=false
            })

            .addCase(createComment.pending, (state) => {
            state.loading = true
            })
            .addCase(createComment.fulfilled, (state, action) => {
            state.loading = false
            state.CreateComment=action.payload as unknown as Comments
            })
            .addCase(createComment.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            })
            .addCase(updateComment.pending, (state) => {
                state.loading = true
            })
            .addCase(updateComment.fulfilled, (state, action) => {
                state.loading = false
                state.Updatecomment = action.payload
            })
            .addCase(updateComment.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(deleteComment.pending, (state) => {
            state.loading = true
            })
            .addCase(deleteComment.fulfilled, (state, action) => {
            state.loading = false
            state.DeleteComment = action.payload
            })
            .addCase(deleteComment.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            })


}
})
export default commentsSlice.reducer;
