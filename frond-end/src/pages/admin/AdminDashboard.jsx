import React, { useEffect, useState } from "react";
import AdminLayout from "./layouts/AdminLayout";
import { Link } from "react-router-dom";
import "../../styles/admin/AdminDashboard.css";

function AdminDashboard() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [stats, setStats] = useState({
    totalUsers: 0,
    totalListings: 0,
    flaggedListings: 0,
    supportIssues: 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    fetch(`${API_URL}/api/admin/dashboard-stats`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch((err) => console.error("Failed to load stats:", err));
  }, []);

  return (
    <AdminLayout>
      <div className="admin-dashboard">
        <h1>Admin Dashboard</h1>

        <div className="admin-grid">
          <Link to="/admin/users" className="admin-card">Manage Users</Link>
          <Link to="/admin/listings" className="admin-card">Manage Listings</Link>
          <Link to="/admin/flags" className="admin-card">Flagged Listings</Link>
          <Link to="/admin/support" className="admin-card">Support Requests</Link>
          <Link to="/admin/logs" className="admin-card">User Activity Log</Link>
        </div>

        <div className="admin-dashboard-grid">
          <div className="admin-card">
            <h2>Total Users</h2>
            <p>{stats.totalUsers}</p>
          </div>

          <div className="admin-card">
            <h2>Total Listings</h2>
            <p>{stats.totalListings}</p>
          </div>

          <div className="admin-card">
            <h2>Flagged Listings</h2>
            <p>{stats.flaggedListings}</p>
          </div>

          <div className="admin-card">
            <h2>Support Issues</h2>
            <p>{stats.supportIssues}</p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default AdminDashboard;