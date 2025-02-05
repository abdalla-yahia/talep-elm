import { DeleteHook, getAllHook,PostHook, PutHook } from "@/Hook/Custom-Hook"
import { LoginUserInterface, ManagersPayload, UpdateUserInterface } from "@/Interfaces/InterFaces";
import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosRequestConfig } from "axios";
// import { setManagerData } from "../Reducers/ManagerReducer"

export const fetchAllManagers =createAsyncThunk( 'Managers/getall',async ()=>{
    try {
        const AllManagers = await getAllHook('/api/v1/managers')
        return AllManagers.data;
    } catch (error) {
        return error
    }
    })

export const fetchManagerById = createAsyncThunk('Managers/getManagerbyid',async(id:string)=>{
    try {
        const Manager = await getAllHook(`/api/v1/managers/${id}`)
        return Manager.data;
        } catch (error) {
            return error
            }
    })

export const createManager = createAsyncThunk('Managers/createManager',async(data:ManagersPayload)=>{
    try {
        const Manager = await PostHook('/api/v1/managers',data as unknown as AxiosRequestConfig)
        return Manager.data;
        } catch (error) {
            return error
        }   
    })

export const updateManager = createAsyncThunk('Managers/updateManager',async(data:UpdateUserInterface)=>{
    try {
        const Manager = await PutHook(`/api/v1/managers/${data.id}`,data as unknown as AxiosRequestConfig)
        return Manager;
        } catch (error) {
            return error
            }
    })

export const deleteManager = createAsyncThunk('Managers/deleteManager',async(id:string)=>{
    try {
        const Manager = await DeleteHook(`/api/v1/managers/${id}`)
        return Manager.data;
        } catch (error) {
            return error
        }
    })

export const LoginManager = createAsyncThunk('Managers/login',async (data:LoginUserInterface)=>{
    try {
        const Manager = await PostHook(`/api/v1/${data?.role}/auth/login`,data as unknown as AxiosRequestConfig)
        return Manager.data;
        } catch (error) {
            return error
            }
    })

export const LogOutManager = createAsyncThunk('Managers/logout',async ()=>{
    try {
        const Manager = await getAllHook(`/api/v1/managers/auth/logout`)
        return Manager.data;
        } catch (error) {
            return error
            }
    })
