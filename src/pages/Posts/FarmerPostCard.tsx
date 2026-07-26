import { styles } from "./Styles";
import { Link } from "react-router-dom";
interface Post {
  id: string | number;
  title: string;
  cropType: string;
  quantity: number;
  pricePerBasket: number;
  harvestDate: string;
  location: string;
  image: string;
  status: string;
}


export const FarmerPostCard = ({ post }: { post: Post }) => {
  return (
    <div style={styles.card}>
      <img src={post.image} alt={post.title} style={styles.image} />
      <div style={styles.content}>
        <h3>{post.title}</h3>
        <p>
          <span style={styles.label}>Crop:</span> {post.cropType}
        </p>
        <p>
          <span style={styles.label}>Price:</span> {post.pricePerBasket}{" "}
          MMK/basket
        </p>
        <p>
          <span style={styles.label}>Status:</span> {post.status}
        </p>

        <button style={styles.button}>
          <Link
            to={`/farmerPostDetails/${post.id}`}
            style={{ textDecoration: "none" }}
          >
            View Full Details
          </Link>
        </button>
      </div>
    </div>
  );
};
