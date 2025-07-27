'use client'
import SideBar from "@/Components/Books/SideBar";
import BookContainer from "@/Components/Books/BookContainer";
import { useEffect, useState } from "react";
import { Chapter } from "@/Interfaces/InterFaces";
import { useSearchParams } from "next/navigation";
import  BooksData from '@/Components/Books/Data';

export default function BooksContainer() {
      const searchParams = useSearchParams();
      

    const [Book, setBook] = useState({})

    useEffect(() => {
      const bookTitle = searchParams.get("كتاب");
      const AuthorName = searchParams.get("المؤلف");
      const SheikhName = searchParams.get("بشرح");
      const section = searchParams.get("القسم");

      const Books = BooksData();
      if (bookTitle && AuthorName && SheikhName) {
        const selectedBook = Books.find(book => book.title.trim() == decodeURIComponent(section as string)?.trim());
        if (selectedBook) {
          const selectedChapter = selectedBook.books.find(chapter => chapter.title.trim() == decodeURIComponent(bookTitle as string).trim() && chapter.author.trim() == decodeURIComponent(AuthorName as string).trim() && chapter.publisher.trim() == decodeURIComponent(SheikhName as string).trim()) 
          if (selectedChapter) {
            setBook(selectedChapter as Chapter);
          } else {
            setBook({});
          }
        } else {
          setBook({});
        }
      }
    }, [searchParams]);
    
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
