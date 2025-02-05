import { createSlice } from "@reduxjs/toolkit";
import { fetchAllReComments,fetchReCommentById,createReComment,updateReComment,deleteReComment } from "../Actions/ReCommentsActions";

const initialState = {
    ReComments:[],
    Recomment:{},
    CreateReComment:{},
    UpdateReComment:{},
    DeleteReComment:{},
    loading:false,
    error:null as unknown
}

const commentsSlice = createSlice({
    name:'comments',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
            .addCase(fetchAllReComments.pending,(state)=>{
            state.loading=true
            })
            .addCase(fetchAllReComments.fulfilled,(state,action)=>{
            state.loading=false
            state.ReComments=action.payload
            })
            .addCase(fetchAllReComments.rejected,(state,action)=>{
            state.loading=false
            state.error=action.payload
            })

            .addCase(fetchReCommentById.pending, (state) => {
            state.loading=true
            })
            .addCase(fetchReCommentById.fulfilled, (state, action) => {
            state.loading=false
            state.Recomment=action.payload
            })
            .addCase(fetchReCommentById.rejected, (state, action) => {
            state.loading=false
            state.error=action.payload
            })

            .addCase(createReComment.pending, (state) => {
            state.loading = true
            })
            .addCase(createReComment.fulfilled, (state, action) => {
            state.loading = false
            state.CreateReComment=action.payload
            })
            .addCase(createReComment.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            })
            .addCase(updateReComment.pending, (state) => {
                state.loading = true
            })
            .addCase(updateReComment.fulfilled, (state, action) => {
                state.loading = false
                state.UpdateReComment = action.payload
            })
            .addCase(updateReComment.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
            })
            .addCase(deleteReComment.pending, (state) => {
            state.loading = true
            })
            .addCase(deleteReComment.fulfilled, (state, action) => {
            state.loading = false
            state.DeleteReComment = action.payload
            })
            .addCase(deleteReComment.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload
            })


}
})
export default commentsSlice.reducer;
