// pages/InfinitePostsObserverPage.tsx

import { Loader2 } from "lucide-react";
import { useInfinitePosts } from "../features/posts/hooks/useInfinitePosts";
import InfinteScrollContainer from "@/features/posts/components/InfinteScrollContainer";

const InfinitePostsObserverPage = () => {
  const {
    data,
    isError,
    error,
    isPending,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useInfinitePosts();

  if (isPending) return <Loader2 className="animate-spin mx-auto" />;

  // flatMap is used to flatten the array of arrays into a single array
  // EXAMPLE: {PAGE1: {posts: [1, 2, 3]}, PAGE2: {posts: [4, 5, 6]}} => [1, 2, 3, 4, 5, 6]

  const posts = data?.pages.flatMap((page) => page.posts);

  return (
    <div className="mb-10">
      {posts && posts.length > 0 && (
        <InfinteScrollContainer
          onBottomReached={() => hasNextPage && !isFetching && fetchNextPage()}
        >
          {posts.map((post) => (
            <div key={post._id} className="post-item">
              <h3>{post.title}</h3>
              <p>{post.content}</p>
            </div>
          ))}

          {isFetchingNextPage && <Loader2 className="animate-spin mx-auto" />}
        </InfinteScrollContainer>
      )}
      {!isError && !posts?.length && (
        <div className="text-center">No posts</div>
      )}
      {isError && (
        <div className="text-red-500 text-center">{error.message}</div>
      )}
    </div>
  );
};

export default InfinitePostsObserverPage;
