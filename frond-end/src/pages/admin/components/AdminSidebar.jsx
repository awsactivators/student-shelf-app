import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/admin/AdminSidebar.css";

function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <h2>Admin Panel</h2>
      <ul className="admin-sidebar-list">
        <li><Link to="/admin/dashboard">Dashboard</Link></li>
        <li><Link to="/admin/users">Users</Link></li>
        <li><Link to="/admin/listings">Listings</Link></li>
        <li><Link to="/admin/flags">Flagged Listings</Link></li>
        <li><Link to="/admin/support">Support Issues</Link></li>
        <li><Link to="/admin/logs">User Activity Log</Link></li>
      </ul>
    </div>
  );
}

export default AdminSidebar;