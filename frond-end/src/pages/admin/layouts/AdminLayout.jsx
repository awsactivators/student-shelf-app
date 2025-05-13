import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import "../../../styles/admin/AdminLayout.css";

function AdminLayout({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const userData = JSON.parse(localStorage.getItem("userData"));
    const isAdmin = userData?.isAdmin === true || userData?.isAdmin === 1;

    if (!token || !isAdmin) {
      navigate("/home");
    }
  }, []);

  return (
    <div className="admin-layout">
      <AdminSidebar />
      <div className="admin-content">{children}</div>
    </div>
  );
}

export default AdminLayout;