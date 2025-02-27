'use client'
import SideBar from "@/Components/Books/SideBar";
import BookContainer from "@/Components/Books/BookContainer";
import { useState } from "react";
import { Chapter } from "@/Interfaces/InterFaces";


export default function UserDAshboardLayout() {
  const [Book, setBook] = useState({})
  return (
        <section className="flex h-full container justify-start items-start gap-1">
          <div className="h-full w-2/6 md:w-1/6 lg:w-1/6">
            <SideBar setBook={setBook as (chapter: Chapter) => void} />
          </div>
          <div className="md:w-5/6 lg:w-5/6 w-4/6 h-full overflow-scroll scrollbar-hide gap-3 bg-second_background_color  rounded p-3 flex justify-start items-start flex-col flex-wrap">
            <BookContainer Book={Book as Chapter} />
          </div>
        </section>

  );
}
