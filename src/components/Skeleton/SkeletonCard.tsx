import "./SkeletonCard.css";

interface SkeletonCardProps {
  type?: "contract" | "harvest" | "farmer" | "payment";
}

const SkeletonCard = ({ type = "contract" }: SkeletonCardProps) => {
  return (
    <div className={`skeleton-card ${type}`}>
      {/* Image */}
      <div className="skeleton skeleton-image"></div>

      <div className="skeleton-content">
        {/* Title */}
        <div className="skeleton skeleton-title"></div>

        {/* Details */}
        <div className="skeleton skeleton-line"></div>
        <div className="skeleton skeleton-line"></div>
        <div className="skeleton skeleton-line short"></div>

        {/* Button */}
        <div className="btn-gp">
          <div className="skeleton skeleton-button"></div>
          <div className="skeleton skeleton-button"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
