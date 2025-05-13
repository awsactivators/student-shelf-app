import React, { useEffect, useState } from "react";
import AdminLayout from "./layouts/AdminLayout";
import { Link } from "react-router-dom";
import "../../styles/admin/AdminFlags.css";

function AdminFlags() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [flags, setFlags] = useState([]);
  const [flash, setFlash] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("userToken");
  
    fetch(`${API_URL}/api/admin/flags`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setFlags(data))
      .catch((err) => console.error("Failed to load flags:", err));
  }, []);

  const dismissFlag = async (id) => {
    await fetch(`${API_URL}/api/admin/flags/${id}`, { 
      method: "DELETE", 
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
    });
    setFlags((prev) => prev.filter((flag) => flag.id !== id));
    setFlash("Flag dismissed!");
    setTimeout(() => setFlash(""), 3000);
  };

  const deleteListing = async (listingId) => {
    await fetch(`${API_URL}/api/admin/listings/${listingId}`, { 
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } 
    
    });
    setFlags((prev) => prev.filter((flag) => flag.listingId !== listingId));
    setFlash("Flagged listing deleted successfully!");
    setTimeout(() => setFlash(""), 3000);
  };

  const suspendUser = async (userId) => {
    await fetch(`${API_URL}/api/admin/users/${userId}/suspend`, { 
      method: "POST",
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` } 
    });
    setFlash("User suspended!");
    setTimeout(() => setFlash(""), 3000);
  };

  return (
    <AdminLayout>
      <div className="admin-flagged-page">
        <h1>Flagged Listings</h1>
        {flash && <div className="flash-message">{flash}</div>}
        {flags.length === 0 ? (
          <p>No flagged listings.</p>
        ) : (
          <table className="admin-flagged-table">
            <thead>
              <tr>
                <th>Listing</th>
                <th>Flagged By</th>
                <th>Reason</th>
                <th>Comment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {flags.map((flag) => (
                <tr key={flag.id}>
                  <td>
                    <Link to={`/listing/${flag.listingId}`} className="admin-link">
                      {flag.listing?.title || "Untitled"}
                    </Link>
                  </td>
                  <td>{flag.user?.name || "Anonymous"}</td>
                  <td>{flag.reason}</td>
                  <td>{flag.comment || "—"}</td>
                  <td>
                    <button className="admin-btn danger" onClick={() => deleteListing(flag.listingId)}>
                      Delete Listing
                    </button>
                    <button className="admin-btn warning" onClick={() => suspendUser(flag.listing?.userId)}>
                      Suspend User
                    </button>
                    <button className="admin-btn secondary" onClick={() => dismissFlag(flag.id)}>
                      Dismiss
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminFlags;