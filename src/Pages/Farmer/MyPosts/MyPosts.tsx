import { useEffect, useState } from "react";
import "./MyPosts.css";

import { useAuth } from "../../../context/AuthContext";

import { getFarmerPosts, deletePost } from "../../../services/postService";

import type { Post } from "../../../types/Post";

import CreatePostModal from "../../../components/CreatePostModal/CreatePostModal";
import Loader from "../../../components/Loader/Loader";

const MyPosts = () => {
  const { user } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // ========================================
  // Load Farmer Posts
  // ========================================

  const loadPosts = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const data = await getFarmerPosts(user.uid);

      setPosts(data);
    } catch (error) {
      console.error("Error loading my posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // Load Posts When User Changes
  // ========================================

  useEffect(() => {
    loadPosts();
  }, [user]);

  // ========================================
  // Delete Post
  // ========================================

  const handleDelete = async (postId: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?",
    );

    if (!confirmDelete) return;

    try {
      await deletePost(postId);

      alert("Post deleted successfully.");

      await loadPosts();
    } catch (error) {
      console.error("Error deleting post:", error);

      alert("Failed to delete post.");
    }
  };

  if (loading) {
    return (
      <div className="my-posts-loading">
        <Loader />
      </div>
    );
  }

  return (
    <div className="my-posts-page">
      {/* ================= HEADER ================= */}

      <div className="my-posts-header">
        <div>
          <h1>My Posts</h1>

          <p>Manage your crop posts and connect with potential buyers.</p>
        </div>

        <button
          className="create-post-btn"
          onClick={() => setShowCreateModal(true)}
        >
          + Create Post
        </button>
      </div>

      {/* ================= EMPTY STATE ================= */}

      {posts.length === 0 ? (
        <div className="my-posts-empty">
          <div className="empty-icon">🌾</div>

          <h2>No Posts Yet</h2>

          <p>
            You have not created any crop posts yet. Create your first post to
            let buyers know about your available crops.
          </p>

          <button
            className="create-post-btn"
            onClick={() => setShowCreateModal(true)}
          >
            Create Your First Post
          </button>
        </div>
      ) : (
        /* ================= POST GRID ================= */

        <div className="my-posts-grid">
          {posts.map((post) => (
            <div className="my-post-card" key={post.id}>
              {/* Image */}

              <div className="post-image-container">
                <img
                  src={
                    post.image || "https://placehold.co/600x350?text=No+Image"
                  }
                  alt={post.title}
                  className="my-post-image"
                />

                <span className={`post-status ${post.status.toLowerCase()}`}>
                  {post.status}
                </span>
              </div>

              {/* Content */}

              <div className="my-post-content">
                <h2>{post.title}</h2>

                <p className="post-crop">🌾 {post.crop}</p>

                <div className="post-details">
                  <p>
                    <strong>Quantity:</strong> {post.quantity} KG
                  </p>

                  <p>
                    <strong>Expected Price:</strong>{" "}
                    {post.expectedPrice
                      ? `${post.expectedPrice} / KG`
                      : "Not specified"}
                  </p>

                  <p>
                    <strong>Location:</strong>{" "}
                    {post.location || "Not specified"}
                  </p>

                  <p>
                    <strong>Harvest Date:</strong>{" "}
                    {post.harvestDate || "Not specified"}
                  </p>
                </div>

                {post.description && (
                  <p className="post-description">{post.description}</p>
                )}

                {/* Actions */}

                <div className="post-actions">
                  <button
                    className="edit-post-btn"
                    onClick={() =>
                      alert("Edit Post feature will be added next.")
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="delete-post-btn"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= CREATE POST MODAL ================= */}

      <CreatePostModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onCreated={loadPosts}
      />
    </div>
  );
};

export default MyPosts;
