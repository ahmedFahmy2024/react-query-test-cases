// pages/OptimisticUpdatesPage.tsx

import { useState } from "react";
import { usePosts } from "../features/posts/hooks/usePosts";
import { useCreatePostOptimistic } from "../features/posts/hooks/useCreatePostOptimistic";
import type { IPost } from "../features/posts/types";

const OptimisticUpdatesPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const allPosts = usePosts();
  const createPostOptimistic = useCreatePostOptimistic();

  const handleCreatePost = () => {
    createPostOptimistic.mutate(
      { title: title.trim(), content: content.trim() },
      {
        onSuccess: () => {
          // Clear form on success
          setTitle("");
          setContent("");
        },
      }
    );
  };

  const handleQuickPost = (postData: { title: string; content: string }) => {
    createPostOptimistic.mutate(postData);
  };

  if (allPosts.isPending) return <div>Loading posts...</div>;
  if (allPosts.isError) return <div>Error loading posts</div>;

  return (
    <div style={{ padding: "20px" }}>
      {/* Create Post Form */}
      <div
        style={{
          marginBottom: "30px",
          padding: "20px",
          border: "1px solid #ddd",
          borderRadius: "8px",
        }}
      >
        <h3>Create New Post</h3>
        <div style={{ marginBottom: "10px" }}>
          <input
            type="text"
            placeholder="Post title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <textarea
            placeholder="Post content..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={3}
            style={{ width: "100%", padding: "8px", marginBottom: "10px" }}
          />
          <button
            onClick={handleCreatePost}
            disabled={createPostOptimistic.isPending}
          >
            {createPostOptimistic.isPending
              ? "Creating..."
              : "Create Post (Optimistic)"}
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: "30px" }}>
        <h3>Quick Test Posts</h3>
        <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
          <button
            onClick={() =>
              handleQuickPost({
                title: "Quick Post",
                content: "This is a quick test post",
              })
            }
            style={{
              padding: "8px 16px",
              backgroundColor: "#28a745",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Add Quick Post
          </button>
        </div>
      </div>

      {/* Posts List */}
      <div>
        <h3>Posts ({allPosts.data.posts.length})</h3>
        {allPosts.data.posts.length === 0 ? (
          <p>No posts yet. Create one above!</p>
        ) : (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            {allPosts.data.posts.map((post: IPost) => (
              <div
                key={post._id}
                className="post-item"
                style={{
                  padding: "15px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  backgroundColor: post._id.startsWith("temp-")
                    ? "#fff3cd"
                    : "#f8f9fa", // Highlight optimistic posts
                }}
              >
                <h4 style={{ margin: "0 0 8px 0" }}>{post.title}</h4>
                <p style={{ margin: "0 0 8px 0", color: "#666" }}>
                  {post.content}
                </p>
                <small style={{ color: "#999" }}>
                  {post._id.startsWith("temp-") ? (
                    <span style={{ color: "#856404" }}>
                      ⏳ Optimistic (pending server response)
                    </span>
                  ) : (
                    `Created: ${new Date(post.createdAt).toLocaleString()}`
                  )}
                </small>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OptimisticUpdatesPage;
