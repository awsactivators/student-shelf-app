import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AdminLayout from "./layouts/AdminLayout";
import "../../styles/admin/AdminActivityLog.css";

function AdminActivityLog() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("userToken");
  
    fetch(`${API_URL}/api/admin/logs`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Logs:", data);
        setLogs(data);
      })
      .catch((err) => console.error("Failed to fetch logs:", err));
  }, []);

  return (
    <AdminLayout>
      <div className="admin-activity-log">
        <h1>User Activity Log</h1>
        {logs.length === 0 ? (
          <p>No activity logs available.</p>
        ) : (
          <table className="admin-activity-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Action</th>
                <th>Description</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td data-label="User"><Link to={`/seller/${log.user?.id}`}>{log.user?.name || "Unknown"}</Link></td>
                  <td data-label="Log">{log.action}</td>
                  <td data-label="Description">{log.description}</td>
                  <td data-label="CreatedAt">{new Date(log.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}

export default AdminActivityLog;