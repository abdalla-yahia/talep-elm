import { createSlice } from "@reduxjs/toolkit";
import { fetchNews, fetchNewsByID, createNews, updateNews,deleteNews } from "../Actions/NewsActions";

const initialState = {
    AllNews:[],
    News:{},
    CreateNews:{},
    DeleteNews:{},
    UpdateNews:{},
    loading:false,
    error:null as unknown
}

const Newslice = createSlice({
    name:'News',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        
        .addCase(fetchNews.pending,(state)=>{
            state.loading=true
            })
        .addCase(fetchNews.fulfilled,(state,action)=>{
            state.AllNews=action.payload
            state.loading=false
            })
        .addCase(fetchNews.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(fetchNewsByID.pending,(state)=>{
            state.loading=true
            })
        .addCase(fetchNewsByID.fulfilled,(state,action)=>{
            state.News=action.payload
            state.loading=false
            })
        .addCase(fetchNewsByID.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(createNews.pending,(state)=>{
            state.loading=true
            })
        .addCase(createNews.fulfilled,(state,action)=>{
            state.CreateNews=action.payload
            state.loading=false
            })
        .addCase(createNews.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(updateNews.pending,(state)=>{
            state.loading=true
            })
        .addCase(updateNews.fulfilled,(state,action)=>{
            state.UpdateNews=action.payload
            state.loading=false
            })
        .addCase(updateNews.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })

        .addCase(deleteNews.pending,(state)=>{
            state.loading=true
            })
        .addCase(deleteNews.fulfilled,(state,action)=>{
            state.DeleteNews=action.payload
            state.loading=false
            })
        .addCase(deleteNews.rejected,(state,action)=>{
            state.error=action.payload
            state.loading=false
            })


            }
            })
export default Newslice.reducer;