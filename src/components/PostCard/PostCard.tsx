import "./PostCard.css";

import type { Post } from "../../types/Post";

interface Props {
  post: Post;
  isFarmer?: boolean;
  onEdit?: (post: Post) => void;
  onDelete?: (id: string) => void;
  onView?: (post: Post) => void;
}

const PostCard = ({
  post,
  isFarmer = false,
  onEdit,
  onDelete,
  onView,
}: Props) => {
  return (
    <div className="post-card">
      <div className="post-image-container">
        <img
          src={post.image || "https://placehold.co/600x400?text=Farmer+Post"}
          alt={post.title}
          className="post-image"
        />

        <span
          className={`post-status ${
            post.status === "Active" ? "active" : "closed"
          }`}
        >
          {post.status}
        </span>
      </div>

      <div className="post-content">
        <h2>{post.title}</h2>

        <p className="post-farmer">
          <strong>Farmer:</strong> {post.farmerName}
        </p>

        <div className="post-details">
          <p>
            <strong>Crop:</strong> {post.crop}
          </p>

          <p>
            <strong>Quantity:</strong> {post.quantity} KG
          </p>

          <p>
            <strong>Location:</strong> {post.location}
          </p>

          <p>
            <strong>Harvest Date:</strong> {post.harvestDate}
          </p>
        </div>

        <p className="post-description">{post.description}</p>

        <div className="post-actions">
          {isFarmer ? (
            <>
              <button className="view-btn" onClick={() => onView?.(post)}>
                View
              </button>

              <button className="edit-btn" onClick={() => onEdit?.(post)}>
                Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => onDelete?.(post.id)}
              >
                Delete
              </button>
            </>
          ) : (
            <button className="view-btn" onClick={() => onView?.(post)}>
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default PostCard;
