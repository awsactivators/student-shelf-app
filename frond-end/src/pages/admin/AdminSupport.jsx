import React, { useEffect, useState } from "react";
import AdminLayout from "./layouts/AdminLayout";
import "../../styles/admin/AdminSupport.css";

function AdminSupport() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [requests, setRequests] = useState([]);
  const [flash, setFlash] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("userToken");
  
    fetch(`${API_URL}/api/admin/contacts`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setRequests(data))
      .catch((err) => console.error("Failed to load contacts:", err));
  }, []);

  const resolveRequest = async (id) => {
    await fetch(`${API_URL}/api/admin/contacts/${id}/resolve`, { 
      method: "PUT", 
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
    });
    setRequests((prev) =>
      prev.map((req) => (req.id === id ? { ...req, status: "resolved" } : req))
    );
    setFlash("User has been notified. Issue marked as resolved.");
    setTimeout(() => setFlash(""), 3000);
  };

  return (
    <AdminLayout>
      <div className="admin-support-page">
        <h1>Support Requests</h1>
        {flash && <div className="flash-message">{flash}</div>}
        {requests.length === 0 ? (
          <p>No support requests yet.</p>
        ) : (
          <div className="scrollable-table-wrapper">
            <table className="admin-support-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>Subject</th>
                  <th>Message</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {[...requests]
                  .sort((a, b) => a.status === "resolved" ? 1 : -1)
                  .map((req) => (
                  <tr key={req.id}>
                    <td data-label="Email">{req.email}</td>
                    <td data-label="Subject">{req.subject}</td>
                    <td data-label="Message">{req.message}</td>
                    <td data-label="Status">
                      <span className={`status ${req.status}`}>{req.status || "pending"}</span>
                    </td>
                    <td data-label="Actions">
                      {req.status !== "resolved" ? (
                        <button className="admin-btn resolve" onClick={() => resolveRequest(req.id)}>
                          Mark Resolved
                        </button>
                      ) : (
                        <span className="resolved-note">Resolved</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminSupport;