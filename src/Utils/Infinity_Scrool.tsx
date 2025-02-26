import InfiniteScroll from 'react-infinite-scroll-component';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks';
import { PostsInterface } from '@/Interfaces/InterFaces';
import { fetchPosts } from '@/lib/Actions/PostsActions';

export default function Inifinity_Scroll() {
  const [items, setItems] = useState<PostsInterface[]>([]);
  const [page, setPage] = useState(1);
  const { AllPosts } = useAppSelector(state => state.post) as unknown as { AllPosts: { Posts: PostsInterface[] } }
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(fetchPosts(page as unknown as number))
    }, [dispatch,page])
  // دالة لجلب البيانات
  const fetchMoreData = async () => {
    const data = AllPosts.Posts;
    setItems((prevItems) => [...prevItems, ...data]);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchMoreData(); // جلب البيانات عند تحميل الصفحة لأول مرة
  }, []);

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={true}
      loader={<h4>Loading...</h4>}
    >
      {items.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
        </div>
      ))}
    </InfiniteScroll>
  );
}