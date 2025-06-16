import React from "react";
import { Link, NavLink } from "react-router-dom";
import "../../../styles/admin/AdminSidebar.css";

function AdminSidebar() {
  return (
    <div className="admin-sidebar">
      <h2>Admin Panel</h2>
      <ul className="admin-sidebar-list">
        <li>
          <NavLink to="/admin/dashboard" className={({ isActive }) => isActive ? "active-link" : ""}>Dashboard</NavLink></li>
        <li><NavLink to="/admin/users" className={({ isActive }) => isActive ? "active-link" : ""}>Users</NavLink></li>
        <li><NavLink to="/admin/listings" className={({ isActive }) => isActive ? "active-link" : ""}>Listings</NavLink></li>
        <li><NavLink to="/admin/flags" className={({ isActive }) => isActive ? "active-link" : ""}>Flagged Listings</NavLink></li>
        <li><NavLink to="/admin/support" className={({ isActive }) => isActive ? "active-link" : ""}>Support Issues</NavLink></li>
        <li><NavLink to="/admin/logs" className={({ isActive }) => isActive ? "active-link" : ""}>User Activity Log</NavLink></li>
      </ul>
    </div>
  );
}

export default AdminSidebar;