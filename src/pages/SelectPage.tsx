// pages/SelectPage.tsx
import type { IPost } from "../features/posts/types";
import { usePosts } from "../features/posts/hooks/usePosts";

const SelectPage = () => {
  // <IPost[]> is the type of the data returned by the query we add it so we can use it in the select function
  const selectedPosts = usePosts<IPost[]>(
    {}, // params - empty object if no params needed
    {
      select: (data) => {
        return data.posts;
      },
    }
  );

  if (selectedPosts.isPending) return <div>Loading...</div>;

  if (selectedPosts.isError) return <div>Error</div>;

  return (
    <div>
      {selectedPosts.data?.map((post) => (
        <p key={post._id} className="post-item">
          {post.title}
        </p>
      ))}
    </div>
  );
};

export default SelectPage;
