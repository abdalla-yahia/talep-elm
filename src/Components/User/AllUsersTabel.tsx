import * as icon from '@/Components/Icons/icons';
import {useAppDispatch, useAppSelector} from '@/lib/hooks';
import {useEffect, useState} from 'react';
import {fetchGroups} from '@/lib/Actions/GroupsActions';
import {deleteUser, fetchAllUsers, fetchUserById, updateUser} from '@/lib/Actions/UserActions';
import {toast} from 'react-toastify';
import Link from 'next/link';
import Swal from 'sweetalert2';
import {Groups} from '@prisma/client';
import {AllUserInterface, LogedUserInterface} from '@/Interfaces/InterFaces';
import {usePathname} from 'next/navigation';

export default function AllUsersTabel({place, query, setUserGender, setUserGroup}: {place: {id: number; User: AllUserInterface[]}; query: string | null; setUserGender: React.Dispatch<React.SetStateAction<string>>; setUserGroup: React.Dispatch<React.SetStateAction<string>>}) {
  const {AllGroups} = useAppSelector((state) => state.group) as unknown as {AllGroups: {Groups: Groups[]}};
  const {UpdateUser} = useAppSelector((state) => state.user) as unknown as {UpdateUser: {status: number}};
  const {DeleteUser} = useAppSelector((state) => state.user) as unknown as {DeleteUser: {status: number}};
  const {UserLogedData} = useAppSelector((state) => state.user) as unknown as {UserLogedData: LogedUserInterface};
  const {AllUsers} = useAppSelector((state) => state.user) as unknown as {AllUsers: {User: AllUserInterface[]}};
  const [toggle, setToggle] = useState(false);
  const [indexId, setIndexId] = useState('');
  const [userId, setUserId] = useState('');
  const [AllStudentsDegree, setAllStudentsDegree] = useState<number[]>([]);
  const dispatch = useAppDispatch();

  const path = usePathname();
  useEffect(() => {
    dispatch(fetchGroups());
  }, [userId, dispatch]);
  //Get all students
  useEffect(() => {
    dispatch(fetchAllUsers());
  }, [dispatch]);
  const ShowGroupsHandeller = async (index: number, userId: number) => {
    setIndexId(index as unknown as string);
    setUserId(userId as unknown as string);
    setToggle(!toggle);
  };
  //Delete User From DB
  const DeleteUserHandeller = (id: string) => {
    Swal.fire({
      title: 'هل ستقوم بحذف هذا الطالب؟',
      text: '!!سيؤدي هذا إلى حذف جميع بيانات الطالب',
      icon: 'warning',
      showCancelButton: true,
      cancelButtonText: 'إلغاء',
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم ! قم بحذف الطالب',
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteUser(id));
        Swal.fire({
          title: 'تم الحذف!',
          text: 'تم الحذف بنجاح.',
          icon: 'success',
        });
      }
    });
  };
  const TransfareUserToGroupHandeller = (groupId: string) => {
    dispatch(
      updateUser({
        id: parseInt(userId),
        groupId: parseInt(groupId),
      })
    );
    dispatch(fetchUserById(userId));
  };
  useEffect(() => {
    if (UpdateUser?.status) {
      if (UpdateUser?.status === 201) {
        toast.success('تم نقل الطالب من المجموعة بنجاح');
        setIndexId('');
        setUserId('');
      } else toast.error('لم يتم نقل الطالب من المجموعة');
    }
    if (DeleteUser?.status) {
      if (DeleteUser?.status === 200) {
        toast.success('تم حذف الطالب  بنجاح');
      } else if (DeleteUser?.status === 500) toast.error('لم يتم حذف الطالب  ');
    }
  }, [UpdateUser, DeleteUser]);
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
  }, [AllUsers, AllStudentsDegree]);

  return (
    <>
      <div className='w-full text-gray-700 overflow-x-scroll scrollbar-hide flex flex-col justify-start items-start shadow'>

        {/*Show All Students Table*/}
        <h1 className='flex w-full justify-center items-center'>جدول كل الطلاب</h1>
        <div className='table  w-full   justify-center items-center border-blue-500 border-2'>
          <div className='table-header-group  bg-orange-100 text-blue-600'>
            <span className='table-cell text-center line-clamp-2 p-1 border-l border-red-500 text-sm'>م</span>
            <span className='table-cell text-center line-clamp-2 p-1 border-l border-red-500 text-sm'>الاسم</span>
            <span className='text-center line-clamp-2 p-1 border-l border-red-500 text-sm hidden md:table-cell lg:table-cell'>
              الجنس
              {!path.includes('/groups/') && (
                <select onChange={(e) => setUserGender(`${query?.length ? '&' : ''}userGender=${e.target.value}`)} className='bg-transparent border-none outline-none'>
                  <option selected value=''>
                    الكل
                  </option>
                  <option value='MALE'>ذكر</option>
                  <option value='FEMALE'>انثى</option>
                </select>
              )}
            </span>
            <span className='text-center line-clamp-2 p-1 border-l border-red-500 text-sm hidden md:table-cell lg:table-cell'>العمر</span>
            <span className='text-center line-clamp-2 p-1 border-l border-red-500 text-sm hidden md:table-cell lg:table-cell'>العنوان</span>
            <span className='text-center line-clamp-2 p-1 border-l border-red-500 text-sm hidden md:table-cell lg:table-cell'>
              المجموعة
              {!path.includes('/groups/') && (
                <select onChange={(e) => setUserGroup(`${query?.length ? '&' : ''}userGroup=${e.target.value}`)} name='' id='' className='bg-transparent border-none outline-none'>
                  <option selected value=''>
                    الكل
                  </option>
                  {AllGroups?.Groups?.length > 0 &&
                    AllGroups?.Groups?.map((group, index) => {
                      return (
                        <option key={index} value={group.name}>
                          {group.name}
                        </option>
                      );
                    })}
                </select>
              )}
            </span>
            <span className='text-center line-clamp-2 p-1 border-l border-red-500 text-sm hidden md:table-cell lg:table-cell'>تاريخ التسجيل</span>
            <span className='text-center line-clamp-2 p-1 border-l border-red-500 text-sm hidden md:table-cell lg:table-cell'>عدد التكليفات</span>
            <span className='table-cell text-center line-clamp-2 p-1 border-l border-red-500 text-sm'>درجات التكليفات</span>
            <span className='table-cell text-center line-clamp-2 p-1 border-l border-red-500 text-sm'>درجات الامتحانات</span>
            <span className='table-cell text-center line-clamp-2 p-1 border-l border-red-500 text-sm'>إجمالي الدرجات</span>
            <span className='table-cell text-center line-clamp-2 p-1 border-l border-red-500 text-sm'>ترتيب الطالب</span>
            <span className='table-cell text-center line-clamp-2 p-1 border-l border-red-500 text-sm'> إعدادات الطالب</span>
          </div>
          {place?.User?.length > 0 &&
            place?.User?.map((user, index: number) => {
              const RepeatScore = AllStudentsDegree?.filter(
                (el) => el === +((user?.AssinmentResult?.length && user?.AssinmentResult?.map((e) => +e.score).reduce((acc, cur) => acc + cur)) || 0) + +((user?.ExamResult?.length && user?.ExamResult?.map((e) => +e?.score).reduce((acc, curr) => acc + curr)) || 0)
              )?.length;
              const UserRank =
                AllStudentsDegree?.sort((a, b) => a - b)
                  .reverse()
                  .indexOf(+((user?.AssinmentResult?.length && user?.AssinmentResult?.map((e) => +e.score).reduce((acc, cur) => acc + cur)) || 0) + +((user?.ExamResult?.length && user?.ExamResult?.map((e) => +e?.score).reduce((acc, curr) => acc + curr)) || 0)) + 1;
              return (
                <div key={index} className='table-row-group '>
                  <span className={`${index % 2 == 0 ? 'bg-yellow-50 text-red-700' : 'bg-blue-100 text-gray-800'} table-cell text-center p-1 border-t border-l border-blue-500 text-sm`}>{index + 1}</span>
                  <span className={`${index % 2 == 0 ? 'bg-yellow-50 text-red-700' : 'bg-blue-100 text-gray-800'} table-cell text-center p-1 border-t border-l border-blue-500 text-sm`}>
                    <Link className='bg-transparent flex flex-col w-full border-none items-center hover:text-orange-600 hover:font-bold transition-all cursor-pointer' href={`/${UserLogedData?.path}/dashboard/students/details/${user?.id}`}>
                      {user?.name}{' '}
                    </Link>{' '}
                  </span>
                  <span className={`${index % 2 == 0 ? 'bg-yellow-50 text-red-700' : 'bg-blue-100 text-gray-800'} text-center p-1 border-t border-l border-blue-500 text-sm hidden md:table-cell lg:table-cell`}>{user?.gender === 'MALE' ? 'رجل' : 'أنثي'}</span>
                  <span className={`${index % 2 == 0 ? 'bg-yellow-50 text-red-700' : 'bg-blue-100 text-gray-800'} text-center p-1 border-t border-l border-blue-500 text-sm hidden md:table-cell lg:table-cell`}>{(user?.age && user?.age + ' عام') || 'لم يُذكَرْ'}</span>
                  <span className={`${index % 2 == 0 ? 'bg-yellow-50 text-red-700' : 'bg-blue-100 text-gray-800'} text-center p-1 border-t border-l border-blue-500 text-sm hidden md:table-cell lg:table-cell`}>{(user?.address && user?.address) || 'لم يُذكَرْ'}</span>
                  <span className={`${index % 2 == 0 ? 'bg-yellow-50 text-red-700' : 'bg-blue-100 text-gray-800'} text-center p-1 border-t border-l border-blue-500 text-sm hidden md:table-cell lg:table-cell`}>
                    <Link className='bg-transparent flex flex-col border-none hover:text-orange-600 hover:font-bold transition-all items-center cursor-pointer' href={`/${UserLogedData?.path}/dashboard/groups/details/${user?.Groups?.id}`}>
                      {user?.Groups?.name}{' '}
                    </Link>
                  </span>
                  <span className={`${index % 2 == 0 ? 'bg-yellow-50 text-red-700' : 'bg-blue-100 text-gray-800'} text-center p-1 border-t border-l border-blue-500 text-sm hidden md:table-cell lg:table-cell`}>
                    {' '}
                    {new Date(user?.createdAt).toLocaleDateString('ar-eg', {
                      year: 'numeric',
                      month: 'long',
                      day: '2-digit',
                    })}
                  </span>
                  <span className={`${index % 2 == 0 ? 'bg-yellow-50 text-red-700' : 'bg-blue-100 text-gray-800'} text-center p-1 border-t border-l border-blue-500 text-sm hidden md:table-cell lg:table-cell`}> {user?.AssinmentResult?.length}</span>
                  <span className={`${index % 2 == 0 ? 'bg-yellow-50 text-red-700' : 'bg-blue-100 text-gray-800'} table-cell text-center p-1 border-t border-l border-blue-500 text-sm`}>
                    {' '}
                    {(user?.AssinmentResult?.length &&
                      user?.AssinmentResult?.map((el, i) => (
                        <Link className='bg-transparent border-none' key={i} href={`./assinments-results/details/${el.id}`}>
                          {el.score + ' ,'}
                        </Link>
                      ))) ||
                      0}
                  </span>
                  <span className={`${index % 2 == 0 ? 'bg-yellow-50 text-red-700' : 'bg-blue-100 text-gray-800'} table-cell text-center p-1 border-t border-l border-blue-500 text-sm`}> {(user?.ExamResult?.length && user?.ExamResult?.map((e) => e.score + ' ,')) || 0}</span>
                  <span className={`${index % 2 == 0 ? 'bg-yellow-50 text-red-700' : 'bg-blue-100 text-gray-800'} table-cell text-center p-1 border-t border-l border-blue-500 text-sm`}>
                    {' '}
                    {+((user?.AssinmentResult?.length && user?.AssinmentResult?.map((e) => +e.score).reduce((acc, cur) => acc + cur)) || 0) + +((user?.ExamResult?.length && user?.ExamResult?.map((e) => +e?.score).reduce((acc, curr) => acc + curr)) || 0)}
                  </span>
                  <span className={`${index % 2 == 0 ? 'bg-yellow-50 text-red-700' : 'bg-blue-100 text-gray-800'} table-cell text-center p-1 border-t border-l border-blue-500 text-sm ${UserRank === 1 && 'text-green-500'}`}>
                    {' '}
                    {UserRank === 1
                      ? RepeatScore === 1
                        ? 'الأول'
                        : 'الأول مكرر'
                      : UserRank === 2
                        ? RepeatScore === 1
                          ? 'الثاني'
                          : 'الثاني مكرر'
                        : UserRank === 3
                          ? RepeatScore === 1
                            ? 'الثالث'
                            : 'الثالث مكرر'
                          : UserRank === 4
                            ? RepeatScore === 1
                              ? 'الرابع'
                              : 'الرابع مكرر'
                            : UserRank === 5
                              ? RepeatScore === 1
                                ? 'الخامس'
                                : 'الخامس مكرر'
                              : UserRank === 6
                                ? RepeatScore === 1
                                  ? 'السادس'
                                  : 'السادس مكرر'
                                : UserRank === 7
                                  ? RepeatScore === 1
                                    ? 'السابع'
                                    : 'السابع مكرر'
                                  : UserRank}
                  </span>
                  <span className={`${index % 2 == 0 ? 'bg-yellow-50 text-red-700' : 'bg-blue-100 text-gray-800'} table-cell text-center p-0 border-t border-l border-blue-500 text-sm`}>
                    <span className='text-center border-none flex justify-between items-start  w-full bg-transparent'>
                      {parseInt(indexId) === index && toggle && (
                        <select
                          onChange={(e) => {
                            {
                              TransfareUserToGroupHandeller(e.target.value);
                              setToggle(false);
                            }
                          }}
                          name=''
                          id=''
                          className='rounded text-sm  outline-none bg-transparent'
                        >
                          <option selected disabled value=''>
                            نقل إلى مجموعة
                          </option>
                          {AllGroups?.Groups?.length > 0 &&
                            AllGroups?.Groups?.filter((ele) => ele.gender === user.gender)
                              .filter((el) => el.id !== place?.id)
                              .map((e, index) => {
                                return (
                                  <option key={index} value={e.id}>
                                    {e.name}
                                  </option>
                                );
                              })}
                        </select>
                      )}
                      <icon.MdTransferWithinAStation onClick={() => ShowGroupsHandeller(index, user.id as unknown as number)} title='نقل من المجموعة' className='text-4xl px-2 hover:text-green-600 transition-all cursor-pointer font-bold text-blue-500' />
                      <icon.CiTrash onClick={() => DeleteUserHandeller(user?.id as unknown as string)} title='حذف الطالب نهائياً' className='text-4xl px-2 hover:text-green-600 transition-all cursor-pointer font-bold text-red-500' />
                    </span>
                  </span>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
