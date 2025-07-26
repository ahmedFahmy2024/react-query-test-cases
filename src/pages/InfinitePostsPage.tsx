// pages/InfinitePostsPage.tsx

import { useInfinitePosts } from "../features/posts/hooks/useInfinitePosts";

const InfinitePostsPage = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfinitePosts();

  // flatMap is used to flatten the array of arrays into a single array
  // EXAMPLE: {PAGE1: {posts: [1, 2, 3]}, PAGE2: {posts: [4, 5, 6]}} => [1, 2, 3, 4, 5, 6]

  const posts = data?.pages.flatMap((page) => page.posts);

  return (
    <div>
      {posts?.map((post) => (
        <div key={post._id} className="post-item">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
      {isFetchingNextPage && <div>Loading...</div>}
      {hasNextPage && (
        <button disabled={isFetchingNextPage} onClick={() => fetchNextPage()}>
          {isFetchingNextPage ? "Loading..." : "Load More"}
        </button>
      )}
    </div>
  );
};

export default InfinitePostsPage;
// fetchNextPage is used to fetch the next page of data
// hasNextPage is used to check if there is a next page of data
// isFetchingNextPage is used to check if the next page is being fetched
