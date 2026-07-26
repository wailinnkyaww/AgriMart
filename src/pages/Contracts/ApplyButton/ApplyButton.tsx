import { useState } from "react";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../../config/firebase";
import { useAuth } from "../../../context/AuthContext";
import type { Contract } from "../../../types/Contract";
import { createNotification } from "../../../services/notificationService";

interface ApplyButtonProps {
  contract: Contract;
  onApplied: () => Promise<void>;
}

const ApplyButton = ({ contract, onApplied }: ApplyButtonProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!user) return null;

  // Hide button if contract owner
  const isOwner = user.uid === contract.creator.uid;

  // Already applied?
  const alreadyApplied = contract.applicants?.some(
    (applicant) => applicant.userId === user.uid,
  );

  // Contract closed?
  const isClosed =
    contract.status === "Assigned" ||
    contract.status === "Completed" ||
    contract.status === "Cancelled";

  if (isOwner) return null;

  const handleApply = async () => {
    if (loading || alreadyApplied || isClosed) return;

    try {
      setLoading(true);

      await updateDoc(doc(db, "contracts", contract.id), {
        applicants: arrayUnion({
          userId: user.uid,
          name: user.fullName || "Unknown",
          role: user.role || "Farmer",
          appliedAt: new Date().toISOString(),
          status: "Pending",
        }),
      });
      await createNotification({
        userId: contract.creator.uid,
        title: "New Application",
        message: `${user.fullName} applied for "${contract.title}".`,
        type: "Application",
        isRead: false,
        createdAt: new Date().toISOString(),
      });

      await onApplied();
      alert("Applied successfully!");
    } catch (error) {
      console.error(error);
      alert("Failed to apply.");
    } finally {
      setLoading(false);
    }
  };

  if (alreadyApplied) {
    return (
      <button className="create-btn" disabled>
        Applied
      </button>
    );
  }

  if (isClosed) {
    return (
      <button className="create-btn" disabled>
        {contract.status}
      </button>
    );
  }

  return (
    <button className="create-btn" onClick={handleApply} disabled={loading}>
      {loading ? "Applying..." : "Apply"}
    </button>
  );
};

export default ApplyButton;
