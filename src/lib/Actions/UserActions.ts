import { DeleteHook, getAllHook,PostHook, PutHook } from "@/Hook/Custom-Hook"
import { ActionCreatorWithPayload, createAsyncThunk } from "@reduxjs/toolkit"
import { setUserData } from "../Reducers/UserReducer"
import { AxiosRequestConfig } from "axios"
import { LoginUserInterface, UpdateUserInterface, UserPayload } from "@/Interfaces/InterFaces"

export const fetchAllUsers =createAsyncThunk( 'users/getall',async ()=>{
    try {
        const AllUsers = await getAllHook(`/api/v1/users/all-users`)
        return AllUsers.data;
    } catch (error) {
        return error
    }
    })

export const fetchAllUsersWithQuery =createAsyncThunk( 'users/getallWithQuery',async (query:string)=>{
    try {
        const AllUsers = await getAllHook(`/api/v1/users?${query}`)
        return AllUsers.data;
    } catch (error) {
        return error
    }
    })

export const fetchUserById = createAsyncThunk('users/getuserbyid',async(id:string)=>{
    try {
        const user = await getAllHook(`/api/v1/users/${id}`)
        return user.data;
        } catch (error) {
            return error
            }
    })

export const createUser = createAsyncThunk('users/createuser',async(data:UserPayload)=>{
    try {
        const user = await PostHook('/api/v1/users/auth/registers',data as unknown as AxiosRequestConfig)
        return user.data;
        } catch (error) {
            return error
        }   
    })

export const updateUser = createAsyncThunk('users/updateuser',async(data:UpdateUserInterface)=>{
    try {
        const user = await PutHook(`/api/v1/users/${data.id}`,data as unknown as AxiosRequestConfig)
        return user.data;
        } catch (error) {
            return error
            }
    })

export const deleteUser = createAsyncThunk('users/deleteuser',async(id:string)=>{
    try {
        const user = await DeleteHook(`/api/v1/users/${id}`)
        return user.data;
        } catch (error) {
            return error
        }
    })

export const LoginUser = createAsyncThunk('users/login',async (data:LoginUserInterface)=>{
    try {
        const user = await PostHook(`/api/v1/${data?.role}/auth/login`,data as unknown as AxiosRequestConfig)
        return user.data;
    } catch (error) {
            return error
            }
    })

export const LogOutUser = createAsyncThunk('users/logout',async ()=>{
    try {
        const user = await getAllHook(`/api/v1/users/auth/logout`)
        return user.data;
        } catch (error) {
            return error
            }
    })

export const SetUserLogedData = (data: string) => async (dispatch: (arg0: { type: ActionCreatorWithPayload<unknown, "user/setUserData">; payload: string }) => string) => {
    try {
        dispatch({
            type: setUserData,
            payload : data
        })
    } catch (error) {
        return error
    }
}