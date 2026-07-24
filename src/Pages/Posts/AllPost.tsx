// import FarmerPosts from "./FarmerPosts";

// export default function AllPost() {
//   return (
//     <>
//       <FarmerPosts />
//     </>
//   );
// }

import { useEffect, useState } from "react";
import "../Farmer/FarmerPosts/FarmerPosts.css";

import { useAuth } from "../../context/AuthContext";
import SendContractModal from "../../components/Modals/SendContractModal/SendContractModal";

import { getPosts } from "../../services/postService";

import type { Post } from "../../types/Post";

import Loader from "../../components/Common/Loader/Loader";

const FarmerPosts = () => {
  const { user } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  // Selected farmer post for sending contract
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // ========================================
  // Load All Farmer Posts
  // ========================================

  const loadData = async () => {
    try {
      setLoading(true);

      const allPosts = await getPosts();

      // ========================================
      // Show ALL available farmer posts
      // Both Buyer and Farmer can see them
      // ========================================

      const availablePosts = allPosts.filter(
        (post) => post.status === "Available",
      );

      setPosts(availablePosts);
    } catch (error) {
      console.error("Error loading farmer posts:", error);
    } finally {
      setLoading(false);
    }
  };

  // ========================================
  // Load Posts
  // ========================================

  useEffect(() => {
    loadData();
  }, []);

  // ========================================
  // Open Send Contract Modal
  // Only Buyer should use this
  // ========================================

  const handleSendContract = (post: Post) => {
    if (!user) {
      alert("Please login first.");
      return;
    }

    if (user.role !== "Buyer") {
      alert("Only buyers can send contract proposals.");
      return;
    }

    setSelectedPost(post);
  };

  // ========================================
  // Loading
  // ========================================

  if (loading) {
    return (
      <div className="farmer-posts-loading">
        <Loader />
      </div>
    );
  }

  return (
    <div className="farmer-posts-container">
      {/* ================= HEADER ================= */}

      <div className="farmer-posts-header">
        <div>
          <h1>Farmer Posts</h1>

          <p>
            Browse available crops posted by farmers.
            {user?.role === "Buyer" &&
              " You can send your existing contracts to farmers."}
          </p>
        </div>
      </div>

      {/* ================= EMPTY ================= */}

      {posts.length === 0 ? (
        <div className="farmer-posts-empty">
          <div className="empty-icon">🌾</div>

          <h2>No Farmer Posts Available</h2>

          <p>There are currently no available crop posts from farmers.</p>
        </div>
      ) : (
        /* ================= POST GRID ================= */

        <div className="farmer-posts-grid">
          {posts.map((post) => (
            <div className="farmer-post-card" key={post.id}>
              {/* ================= IMAGE ================= */}

              <div className="farmer-post-image-container">
                <img
                  src={
                    post.image || "https://placehold.co/600x350?text=No+Image"
                  }
                  alt={post.title}
                  className="farmer-post-image"
                />

                <span className="available-badge">Available</span>
              </div>

              {/* ================= CONTENT ================= */}

              <div className="farmer-post-content">
                <h2>{post.title}</h2>

                <p className="post-crop">🌾 {post.crop}</p>

                <div className="farmer-post-details">
                  <p>
                    <strong>Farmer:</strong>{" "}
                    {post.farmer?.fullName || "Unknown Farmer"}
                  </p>

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

                {/* ================= DESCRIPTION ================= */}

                {post.description && (
                  <p className="farmer-post-description">{post.description}</p>
                )}

                {/* ============================================
                    BUYER ONLY
                    Send Contract Button
                ============================================ */}

                {user?.role === "Buyer" && (
                  <button
                    className="send-contract-btn"
                    onClick={() => handleSendContract(post)}
                  >
                    Send Contract
                  </button>
                )}

                {/* ============================================
                    FARMER VIEW
                ============================================ */}

                {user?.role === "Farmer" && (
                  <div className="farmer-post-view-message">
                    You are viewing available farmer posts.
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ============================================
          SEND CONTRACT MODAL
          Only Buyer can open this modal
      ============================================ */}

      {selectedPost && user?.role === "Buyer" && (
        <SendContractModal
          isOpen={true}
          onClose={() => setSelectedPost(null)}
          farmerId={selectedPost.farmer?.uid}
          farmerName={selectedPost.farmer?.fullName || "Unknown Farmer"}
          postId={selectedPost.id}
          onSent={() => {
            setSelectedPost(null);
          }}
        />
      )}
    </div>
  );
};

export default FarmerPosts;
