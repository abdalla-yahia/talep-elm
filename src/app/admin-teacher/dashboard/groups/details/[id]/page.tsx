'use client'
import AllUsersTabel from "@/Components/User/AllUsersTabel";
import { fetchGroupByID } from "@/lib/Actions/GroupsActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import FullTitle from "@/Utils/FullTitle";
import { AllUserInterface, GroupInterface } from "@/Interfaces/InterFaces";

export default  function SubjectDetails() {
  const {Group} = useAppSelector(state  => state.group) as unknown as {Group:{data:GroupInterface}}
  const {user} = useAppSelector(state=>state.user)
  const {id}  = useParams() as unknown as {id:string}

  const dispatch = useAppDispatch()

    useEffect(()=>{
      dispatch(fetchGroupByID(id))
    },[id,user,dispatch])

  return (
    <>
      <FullTitle
        F_Title={`${Group?.data?.name} - ${
          Group?.data?.gender === "MALE" ? "رجال" : "نساء"
        }`}
      />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <AllUsersTabel
                  place={Group?.data as unknown as {id:number,User:AllUserInterface[]}}
                  query={null}
                  setUserGender={
                    null as unknown as React.Dispatch<
                      React.SetStateAction<string>
                    >
                  }
                  setUserGroup={
                    null as unknown as React.Dispatch<
                      React.SetStateAction<string>
                    >
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
