import { DeleteHook, getAllHook,PostHook, PutHook } from "@/Hook/Custom-Hook"
import { LoginUserInterface, OwnersPayload, UpdateUserInterface } from "@/Interfaces/InterFaces";
import { createAsyncThunk } from "@reduxjs/toolkit"
import { AxiosRequestConfig } from "axios";

export const fetchAllOwners =createAsyncThunk( 'Owners/getall',async ()=>{
    try {
        const AllOwners = await getAllHook('/api/v1/owner')
        return AllOwners.data;
    } catch (error) {
        return error
    }
    })

export const fetchOwnerById = createAsyncThunk('Owners/getOwnerbyid',async(id:string)=>{
    try {
        const Owner = await getAllHook(`/api/v1/owner/${id}`)
        return Owner.data;
        } catch (error) {
            return error
            }
    })

export const createOwner = createAsyncThunk('Owners/createOwner',async(data:OwnersPayload)=>{
    try {
        const Owner = await PostHook('/api/v1/owner',data as unknown as AxiosRequestConfig)
        return Owner.data;
        } catch (error) {
            return error
        }   
    })

export const updateOwner = createAsyncThunk('Owners/updateOwner',async(data:UpdateUserInterface)=>{
    try {
        const Owner = await PutHook(`/api/v1/owner/${data.id}`,data as unknown as AxiosRequestConfig)
        return Owner;
        } catch (error) {
            return error
            }
    })

export const deleteOwner = createAsyncThunk('Owners/deleteOwner',async(id:string)=>{
    try {
        const Owner = await DeleteHook(`/api/v1/owner/${id}`)
        return Owner;
        } catch (error) {
            return error
        }
    })

export const LoginOwner = createAsyncThunk('Owners/login',async (data:LoginUserInterface)=>{
    try {
        const Owner = await PostHook(`/api/v1/owner/auth/login`,data as unknown as AxiosRequestConfig)
        return Owner.data;
        } catch (error) {
            return error
            }
    })

export const LogOutOwner = createAsyncThunk('Owners/logout',async ()=>{
    try {
        const Owner = await getAllHook(`/api/v1/owner/auth/logout`)
        return Owner.data;
        } catch (error) {
            return error
            }
    })

