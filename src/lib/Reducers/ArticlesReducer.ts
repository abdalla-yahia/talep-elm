import { createSlice } from "@reduxjs/toolkit";
import { fetchArticles, fetchArticleByID, createArticle, updateArticle,deleteArticle } from "../Actions/ArticlesActions";

const initialState = {
    AllArticles:[],
    Article:{},
    CreateArticle:{},
    DeleteArticle:{},
    UpdateArticle:{},
    loading:false,
    error:null as unknown
}

const Articleslice = createSlice({
    name:'Articles',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        
        .addCase(fetchArticles.pending,(state)=>{
            state.loading=true
            })
        .addCase(fetchArticles.fulfilled,(state,action)=>{
            state.AllArticles=action.payload
            state.loading=false
            })
        .addCase(fetchArticles.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(fetchArticleByID.pending,(state)=>{
            state.loading=true
            })
        .addCase(fetchArticleByID.fulfilled,(state,action)=>{
            state.Article=action.payload
            state.loading=false
            })
        .addCase(fetchArticleByID.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(createArticle.pending,(state)=>{
            state.loading=true
            })
        .addCase(createArticle.fulfilled,(state,action)=>{
            state.CreateArticle=action.payload
            state.loading=false
            })
        .addCase(createArticle.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(updateArticle.pending,(state)=>{
            state.loading=true
            })
        .addCase(updateArticle.fulfilled,(state,action)=>{
            state.UpdateArticle=action.payload
            state.loading=false
            })
        .addCase(updateArticle.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(deleteArticle.pending,(state)=>{
            state.loading=true
            })
        .addCase(deleteArticle.fulfilled,(state,action)=>{
            state.DeleteArticle=action.payload
            state.loading=false
            })
        .addCase(deleteArticle.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })


            }
            })
export default Articleslice.reducer;