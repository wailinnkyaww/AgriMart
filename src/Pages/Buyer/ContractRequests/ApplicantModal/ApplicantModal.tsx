import "./ApplicantModal.css";

import type { Contract } from "../../../../types/Contract";
import ApplicantCard from "../ApplicantCard/ApplicantCard";

interface ApplicantModalProps {
  contract: Contract | null;
  onClose: () => void;
  onRefresh: () => Promise<void>;
}

const ApplicantModal = ({
  contract,
  onClose,
  onRefresh,
}: ApplicantModalProps) => {
  if (!contract) return null;

  return (
    <div className="modal-overlay">
      <div className="applicant-modal">
        <div className="modal-header">
          <div>
            <h2>{contract.title}</h2>
            <p>{contract.applicants.length} Applicant(s)</p>
          </div>

          <button className="close-modal-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        {contract.applicants.length === 0 ? (
          <div className="empty-applicants">No applicants yet.</div>
        ) : (
          <div className="applicant-list">
            {contract.applicants.map((applicant) => (
              <ApplicantCard
                key={applicant.userId}
                applicant={applicant}
                contract={contract}
                onRefresh={onRefresh}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ApplicantModal;
