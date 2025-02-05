'use client'
import { fetchGroups } from "@/lib/Actions/GroupsActions"
import { useAppDispatch, useAppSelector } from "@/lib/hooks"
import { useEffect } from "react"
import GroupsMap from "./GroupsMap"
import { GroupsInterface } from "@/Interfaces/InterFaces"

export default function GetAllGroups() {

    const {AllGroups} = useAppSelector(state => state.group) as unknown as {AllGroups:{Groups:GroupsInterface[]}}
    const {Group} = useAppSelector(state=> state.group)
    const {UpdateGroup} = useAppSelector(state=> state.group)
    const {DeleteGroup} = useAppSelector(state=> state.group)
    const dispatch = useAppDispatch()
    useEffect(()=>{
      dispatch(fetchGroups())
    },[Group,UpdateGroup,DeleteGroup,dispatch])
    const Groups = AllGroups?.Groups
  return (
    <>
    <GroupsMap Groups ={Groups}/>
    </>
  )
}
