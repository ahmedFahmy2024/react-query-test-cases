// pages/QueriesPage.tsx

import { useQueries } from "@tanstack/react-query";
import type { IPost } from "../features/posts/types";
import createPostsQueryOptions from "../features/posts/queries/postQueries";
import createUsersQueryOptions from "../features/users/queries/userQueries";
import type { IUser } from "../features/users/types";

// we use useQueries when we need to fetch multiple queries at the same time
// we pass the queries as an array to the useQueries hook
// we get the data from the queries as an array
const QueriesPage = () => {
  const [allPosts, allUsers] = useQueries({
    queries: [createPostsQueryOptions(), createUsersQueryOptions()],
  });

  console.log(allUsers.data?.users);

  if (allPosts.isPending) return <div>Loading...</div>;

  if (allPosts.isError) return <div>Error</div>;

  return (
    <main className="grid grid-cols-2">
      <div>
        {allPosts.data.posts.map((post: IPost) => (
          <div key={post._id} className="post-item">
            <h3>{post.title}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
      <div>
        {allUsers.data?.users.map((user: IUser) => (
          <div key={user._id} className="user-item">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default QueriesPage;
