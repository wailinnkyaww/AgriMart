import { styles } from "./Styles";
import { FarmerPostCard } from "./FarmerPostCard";
import { farmerPosts } from "../../data/morkData";

export default function FarmerPosts() {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Farmer Market Posts</h1>
      <div style={styles.grid}>
        {farmerPosts.map((post) => (
          <FarmerPostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
}
