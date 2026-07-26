import { useParams } from "react-router-dom"; // Or use 'next/navigation' for Next.js
import { farmerPosts } from "../../data/morkData"; // Assume your data is exported from here
import { styles } from "./Styles";

export const PostDetail = () => {
  const { id } = useParams();
  const post = farmerPosts.find((p) => p.id === Number(id));

  if (!post) return <div>Post not found</div>;

  return (
    <div style={styles.container}>
      <button onClick={() => window.history.back()}>← Back to Posts</button>
      <div style={{ marginTop: "20px", maxWidth: "800px" }}>
        <img
          src={post.image}
          alt={post.title}
          style={{ width: "100%", borderRadius: "12px" }}
        />
        <h1>{post.title}</h1>
        <div style={styles.card}>
          <p>
            <strong>Crop Type:</strong> {post.cropType}
          </p>
          <p>
            <strong>Quantity:</strong> {post.quantity} baskets
          </p>
          <p>
            <strong>Price:</strong> {post.pricePerBasket} MMK / basket
          </p>
          <p>
            <strong>Location:</strong> {post.location}
          </p>
          <p>
            <strong>Harvest Date:</strong> {post.harvestDate}
          </p>
          <p>
            <strong>Status:</strong> {post.status}
          </p>
        </div>
      </div>
    </div>
  );
};
