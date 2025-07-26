// pages/PostsPage.tsx

import { usePosts } from "../features/posts/hooks/usePosts";
import { useCreatePost } from "../features/posts/hooks/useCreatePosts";
import type { IPost } from "../features/posts/types";

const PostsPage = () => {
  const allPosts = usePosts();
  const createPost = useCreatePost();

  // we can pass the onSuccess function to the mutate function
  const handleCreatePost = () => {
    createPost.mutate(
      { title: "test", content: "test" }
      // {
      //   onSuccess: () => {
      //     console.log("Post created successfully");
      //   },
      // }
    );
  };

  if (allPosts.isPending) return <div>Loading...</div>;

  if (allPosts.isError) return <div>Error</div>;

  return (
    <div>
      <button onClick={handleCreatePost}>Create Post</button>
      {allPosts.data.posts.map((post: IPost) => (
        <div key={post._id} className="post-item">
          <h3>{post.title}</h3>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PostsPage;
