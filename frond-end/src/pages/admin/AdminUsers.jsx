import React, { useEffect, useState } from "react";
import AdminLayout from "./layouts/AdminLayout";
import "../../styles/admin/AdminUsers.css";

function AdminUsers() {
  const [users, setUsers] = useState([]);
  const API_URL = import.meta.env.VITE_API_URL;
  const [flash, setFlash] = useState("");
  

  useEffect(() => {
    const token = localStorage.getItem("userToken");
  
    fetch(`${API_URL}/api/admin/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error("Error loading users:", err));
  }, []);

  const suspendUser = async (id) => {
    await fetch(`${API_URL}/api/admin/users/${id}/suspend`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
    });
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, isVerified: false } : u));
    setFlash("User suspended successfully!");
    setTimeout(() => setFlash(""), 3000);
  };

  const reactivateUser = async (id) => {
    await fetch(`${API_URL}/api/admin/users/${id}/reactivate`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
    });
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, isVerified: true } : u));
    setFlash("User reactivated successfully!");
    setTimeout(() => setFlash(""), 3000);
  };

  const deleteUser = async (id) => {
    await fetch(`${API_URL}/api/admin/users/${id}/suspend`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
    });
    setUsers((prev) => prev.filter((u) => u.id !== id));
    setFlash("User deleted successfully!");
    setTimeout(() => setFlash(""), 3000);
  };

  return (
    <AdminLayout>
      <div className="admin-users-page">
        <h1>Manage Users</h1>
        {flash && <div className="flash-message">{flash}</div>}
        <table className="admin-users-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Campus</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td data-label="Name">{user.name}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="Campus">{user.campus || "-"}</td>
                <td data-label="Status">{user.isVerified ? "Active" : "Suspended"}</td>
                <td data-label="Actions">
                {user.isVerified ? (
                  <button onClick={() => suspendUser(user.id)} className="admin-btn warn">
                    Suspend
                  </button>
                ) : (
                  <button onClick={() => reactivateUser(user.id)} className="admin-btn success">
                    Reactivate
                  </button>
                )}
                  <button onClick={() => deleteUser(user.id)} className="admin-btn danger">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

export default AdminUsers;