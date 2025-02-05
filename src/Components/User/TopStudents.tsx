import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AllUserInterface, LogedUserInterface } from '@/Interfaces/InterFaces';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { fetchAllUsers } from '@/lib/Actions/UserActions';

export default function TopUsersTabel() {
  const { UserLogedData } = useAppSelector((state) => state.user) as unknown as { UserLogedData: LogedUserInterface };
  const { AllUsers } = useAppSelector((state) => state.user) as unknown as {
    AllUsers: { User: AllUserInterface[] };
  };
  const [AllStudentsDegree, setAllStudentsDegree] = useState<number[]>([]);
  const dispatch = useAppDispatch();
  //Get all students from the First Time
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);
  //Set All  Users Final Degree
  useEffect(() => {
    if (AllUsers?.User?.length > 0) {
      setAllStudentsDegree(AllUsers?.User?.map((user) => +((user?.AssinmentResult?.length && user?.AssinmentResult?.map((e) => +e.score).reduce((acc, cur) => acc + cur)) || 0) + +((user?.ExamResult?.length && user?.ExamResult?.map((e) => +e?.score).reduce((acc, curr) => acc + curr)) || 0)))
    }
  }, [AllUsers]);
    //Sort All  Users Final Degree
  useEffect(() => {
    if (AllStudentsDegree.length > 0) {
      setAllStudentsDegree(AllStudentsDegree?.sort((a, b) => a - b).reverse());
    }
  },[AllUsers, AllStudentsDegree]);
  //Sort Users Based on the Total Score
  const sortedUsers = AllUsers?.User
  ?.filter(a=>+((a?.AssinmentResult?.length && a?.AssinmentResult?.map((e) => +e.score).reduce((acc, cur) => acc + cur)) || 0) + +((a?.ExamResult?.length && a?.ExamResult?.map((e) => +e?.score).reduce((acc, curr) => acc + curr))) > 0)
  .sort((a, b) => {
    const aTotalScore = 
      ((a?.AssinmentResult?.length && a?.AssinmentResult?.map((e) => +e.score).reduce((acc, cur) => acc + cur, 0)) || 0) +
      ((a?.ExamResult?.length && a?.ExamResult?.map((e) => +e.score).reduce((acc, cur) => acc + cur, 0)) || 0);
  
    const bTotalScore = 
      ((b?.AssinmentResult?.length && b?.AssinmentResult?.map((e) => +e.score).reduce((acc, cur) => acc + cur, 0)) || 0) +
      ((b?.ExamResult?.length && b?.ExamResult?.map((e) => +e.score).reduce((acc, cur) => acc + cur, 0)) || 0);
  
    return bTotalScore - aTotalScore; // For descending order
  });
  return (
    <>
      {/*Show Only Top Students */}
      <div className='table  w-full overflow-x-scroll  justify-center items-center border-green-500 border-2'>
        <div className='table-header-group  bg-green-200 text-blue-600'>
          <span className='table-cell text-center line-clamp-2 p-1 border-l border-blue-500 text-sm'>م</span>
          <span className='table-cell text-center line-clamp-2 p-1 border-l border-blue-500 text-sm'>الاسم</span>
          <span className='text-center line-clamp-2 p-1 border-l border-blue-500 text-sm hidden md:table-cell lg:table-cell'>المجموعة</span>
          <span className='text-center line-clamp-2 p-1 border-l border-blue-500 text-sm hidden md:table-cell lg:table-cell'>عدد التكليفات</span>
          <span className='table-cell text-center line-clamp-2 p-1 border-l border-blue-500 text-sm'>درجات التكليفات</span>
          <span className='table-cell text-center line-clamp-2 p-1 border-l border-blue-500 text-sm'>درجات الامتحانات</span>
          <span className='table-cell text-center line-clamp-2 p-1 border-l border-blue-500 text-sm'>إجمالي الدرجات</span>
          <span className='table-cell text-center line-clamp-2 p-1 border-l border-blue-500 text-sm'>ترتيب الطالب</span>
        </div>
        {sortedUsers?.length > 0 &&
          AllStudentsDegree?.length > 0 &&
          //Filter results by score and return the top 7 students
          sortedUsers?.filter(
            (user) =>
              AllStudentsDegree
                .indexOf(+((user?.AssinmentResult?.length && user?.AssinmentResult?.map((e) => +e.score).reduce((acc, cur) => acc + cur)) || 0) + +((user?.ExamResult?.length && user?.ExamResult?.map((e) => +e?.score).reduce((acc, curr) => acc + curr)) || 0)) +
                1 <= 7
          )
            ?.map((user, index: number) => {
              const RepeatScore = AllStudentsDegree?.filter((el) => el === +((user?.AssinmentResult?.length && user?.AssinmentResult?.map((e) => +e.score).reduce((acc, cur) => acc + cur)) || 0) + +((user?.ExamResult?.length && user?.ExamResult?.map((e) => +e?.score).reduce((acc, curr) => acc + curr)) || 0))?.length;
              const UserRank =
                AllStudentsDegree?.sort((a, b) => a - b)
                  .reverse()
                  .indexOf(+((user?.AssinmentResult?.length && user?.AssinmentResult?.map((e) => +e.score).reduce((acc, cur) => acc + cur)) || 0) + +((user?.ExamResult?.length && user?.ExamResult?.map((e) => +e?.score).reduce((acc, curr) => acc + curr)) || 0)) + 1;
              return (
                <div key={index} className='table-row-group '>
                  <span className={`${index % 2 == 0 ? 'bg-green-50 text-green-700' : 'bg-green-100 text-blue-800'} table-cell text-center p-1 border-t border-l border-blue-500 text-sm`}>{index + 1}</span>
                  <span className={`${index % 2 == 0 ? 'bg-green-50 text-green-700' : 'bg-green-100 text-blue-800'} table-cell text-center p-1 border-t border-l border-blue-500 text-sm`}>
                    <Link className='bg-transparent flex flex-col w-full border-none items-center hover:text-orange-600 hover:font-bold transition-all cursor-pointer' href={`/${UserLogedData?.path}/dashboard/students/details/${user?.id}`}>
                      {user?.name}{' '}
                    </Link>{' '}
                  </span>
                  <span className={`${index % 2 == 0 ? 'bg-green-50 text-green-700' : 'bg-green-100 text-blue-800'} text-center p-1 border-t border-l border-blue-500 text-sm hidden md:table-cell lg:table-cell`}>
                    <Link className='bg-transparent flex flex-col border-none hover:text-orange-600 hover:font-bold transition-all items-center cursor-pointer' href={`/${UserLogedData?.path}/dashboard/groups/details/${user?.Groups?.id}`}>
                      {user?.Groups?.name}{' '}
                    </Link>
                  </span>
                  <span className={`${index % 2 == 0 ? 'bg-green-50 text-green-700' : 'bg-green-100 text-blue-800'} text-center p-1 border-t border-l border-blue-500 text-sm hidden md:table-cell lg:table-cell`}> {user?.AssinmentResult?.length}</span>
                  <span className={`${index % 2 == 0 ? 'bg-green-50 text-green-700' : 'bg-green-100 text-blue-800'} table-cell text-center p-1 border-t border-l border-blue-500 text-sm`}> {user?.AssinmentResult?.length && user?.AssinmentResult?.map((el) => +el?.score)?.reduce((acc, cur) => acc + cur)}</span>
                  <span className={`${index % 2 == 0 ? 'bg-green-50 text-green-700' : 'bg-green-100 text-blue-800'} table-cell text-center p-1 border-t border-l border-blue-500 text-sm`}> {user?.ExamResult?.length && user?.ExamResult?.map((e) => +e.score)?.reduce((acc, cur) => acc + cur)}</span>
                  <span className={`${index % 2 == 0 ? 'bg-green-50 text-green-700' : 'bg-green-100 text-blue-800'} table-cell text-center p-1 border-t border-l border-blue-500 text-sm`}>
                    {' '}
                    {+((user?.AssinmentResult?.length && user?.AssinmentResult?.map((e) => +e.score).reduce((acc, cur) => acc + cur)) || 0) + +((user?.ExamResult?.length && user?.ExamResult?.map((e) => +e?.score).reduce((acc, curr) => acc + curr)) || 0)}
                  </span>
                  <span className={`${index % 2 == 0 ? 'bg-green-50 text-green-700' : 'bg-green-100 text-blue-800'} table-cell text-center p-1 border-t border-l border-blue-500 text-sm ${UserRank === 1 && 'text-green-500'}`}>
                    {' '}
                    {UserRank === 1 ? (RepeatScore === 1 ? 'الأول':'الأول مكرر') : UserRank === 2 ? (RepeatScore === 1 ? 'الثاني':'الثاني مكرر') : UserRank === 3 ? (RepeatScore === 1 ? 'الثالث':'الثالث مكرر') : UserRank === 4 ? (RepeatScore === 1 ? 'الرابع':'الرابع مكرر') : UserRank === 5 ? (RepeatScore === 1 ? 'الخامس':'الخامس مكرر') : UserRank === 6 ? (RepeatScore === 1 ? 'السادس':'السادس مكرر') : UserRank === 7 ? (RepeatScore === 1 ? 'السابع':'السابع مكرر') : UserRank}
                  </span>
                </div>
              );
            })
            }
      </div>
    </>
  );
}
