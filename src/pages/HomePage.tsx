// pages/HomePage.tsx

import { usePosts } from "../features/posts/hooks/usePosts";
import type { IPost } from "../features/posts/types";

const HomePage = () => {
  const topPosts = usePosts(
    { page: 1, limit: 10 },
    {
      enabled: true,
      staleTime: 60 * 60 * 1000,
      // refetchInterval: 1000,   * refetch every second *
    }
  );

  return (
    <div>
      {topPosts.data?.posts.map((post: IPost) => (
        <p key={post._id} className="post-item">
          {post.title}
        </p>
      ))}
    </div>
  );
};

export default HomePage;
