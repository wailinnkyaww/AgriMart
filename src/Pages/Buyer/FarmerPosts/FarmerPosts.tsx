import { useEffect, useState } from "react";
import "./FarmerPosts.css";

import { useAuth } from "../../../context/AuthContext";
import SendContractModal from "../../../components/SendContractModal/SendContractModal";

import { getPosts } from "../../../services/postService";
import { getContracts } from "../../../services/contractService";

import type { Post } from "../../../types/Post";
import type { Contract } from "../../../types/Contract";

import Loader from "../../../components/Loader/Loader";

const FarmerPosts = () => {
  const { user } = useAuth();

  const [posts, setPosts] = useState<Post[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);

  const [loading, setLoading] = useState(true);

  // Selected post for Send Contract Modal
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  // ========================================
  // Load Farmer Posts and Buyer Contracts
  // ========================================

  const loadData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const [allPosts, allContracts] = await Promise.all([
        getPosts(),
        getContracts(),
      ]);

      // ========================================
      // Show only available posts
      // Do not show buyer's own posts
      // ========================================

      const availablePosts = allPosts.filter(
        (post) => post.status === "Available" && post.farmer?.uid !== user.uid,
      );

      // ========================================
      // Show only current buyer's open contracts
      // ========================================

      const myContracts = allContracts.filter(
        (contract) =>
          contract.creator?.uid === user.uid && contract.status === "Open",
      );

      setPosts(availablePosts);
      setContracts(myContracts);
    } catch (error) {
      console.error("Error loading farmer posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [user]);

  // ========================================
  // Open Send Contract Modal
  // ========================================

  const handleSendContract = (post: Post) => {
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
    <div className="farmer-posts-page">
      {/* ================= HEADER ================= */}

      <div className="farmer-posts-header">
        <div>
          <h1>Farmer Posts</h1>

          <p>
            Browse available crops posted by farmers and send your existing
            contracts.
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
                    <strong>Farmer:</strong> {post.farmer?.fullName}
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

                {post.description && (
                  <p className="farmer-post-description">{post.description}</p>
                )}

                {/* ================= SEND CONTRACT ================= */}

                <button
                  className="send-contract-btn"
                  onClick={() => handleSendContract(post)}
                  disabled={contracts.length === 0}
                >
                  {contracts.length === 0
                    ? "No Open Contract"
                    : "Send Contract"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ================= SEND CONTRACT MODAL ================= */}

      {selectedPost && (
        <SendContractModal
          isOpen={true}
          onClose={() => setSelectedPost(null)}
          farmerId={selectedPost.farmer.uid}
          farmerName={selectedPost.farmer.fullName}
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
