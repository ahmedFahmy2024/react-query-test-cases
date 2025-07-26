// pages/PaginationPage.tsx

import { useState } from "react";
import { PaginationComp } from "@/components/PaginationComp";
import { usePosts } from "../features/posts/hooks/usePosts";
import type { IPost } from "../features/posts/types";

const PaginationPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 10;

  const topPosts = usePosts(
    { page: currentPage, limit },
    {
      staleTime: 60 * 60 * 1000,
    }
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (topPosts.isPending) return <div>loading ...</div>;

  return (
    <div>
      {topPosts.data?.posts.map((post: IPost) => (
        <p key={post._id} className="post-item">
          {post.title}
        </p>
      ))}
      {topPosts.data && (
        <PaginationComp
          currentPage={currentPage}
          totalPages={topPosts.data.totalPages || 0}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default PaginationPage;
