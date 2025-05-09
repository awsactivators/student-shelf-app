import React, { useState } from "react";
import "./../styles/FlagPage.css";

function FlagModal({ show, onClose, onSubmit }) {
  const [reason, setReason] = useState("");
  const [comment, setComment] = useState("");

  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Report Listing</h2>
        <select value={reason} onChange={(e) => setReason(e.target.value)} required>
          <option value="">Select reason</option>
          <option value="Inappropriate content">Inappropriate content</option>
          <option value="Spam">Spam</option>
          <option value="Incorrect info">Incorrect info</option>
        </select>
        <textarea
          placeholder="Additional comments (optional)"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div>
          <button onClick={() => onSubmit(reason, comment)}>Submit</button>
          <button onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default FlagModal;