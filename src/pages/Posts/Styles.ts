export const styles = {
  container: { padding: "20px" },
  title: {
    marginBottom: "20px",
    borderBottom: "2px solid #eee",
    paddingBottom: "10px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "20px",
  },
  card: {
    border: "1px solid #ddd",
    borderRadius: "12px",
    overflow: "hidden",
    backgroundColor: "#fff",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  image: { width: "100%", height: "200px", objectFit: "cover" },
  content: { padding: "15px" },
  label: { fontWeight: "bold", color: "#555" },
  button: {
    marginTop: "15px",
    padding: "10px 20px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    width: "100%",
  },
} as const;

