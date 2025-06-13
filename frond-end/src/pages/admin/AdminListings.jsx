import React, { useEffect, useState } from "react";
import AdminLayout from "./layouts/AdminLayout";
import "../../styles/admin/AdminListings.css";

function AdminListings() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [listings, setListings] = useState([]);
  const [flash, setFlash] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("userToken");
  
    fetch(`${API_URL}/api/admin/listings`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setListings(data))
      .catch((err) => console.error("Error fetching listings:", err));
  }, []);

  const deleteListing = async (id) => {
    await fetch(`${API_URL}/api/admin/listings/${id}`, { 
      method: "DELETE" ,
      headers: { Authorization: `Bearer ${localStorage.getItem("userToken")}` }
    });
    setListings((prev) => prev.filter((l) => l.id !== id));
    setFlash("Listing deleted successfully!");
    setTimeout(() => setFlash(""), 3000);
  };

  return (
    <AdminLayout>
      <div className="admin-listings-page">
        <h1>Manage Listings</h1>
        {flash && <div className="flash-message">{flash}</div>}
        <table className="admin-listings-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Owner</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listings.map((listing) => (
              <tr key={listing.id}>
                <td data-label="Title">{listing.title}</td>
                <td data-label="Price">${listing.price}</td>
                <td data-label="Category">{listing.category}</td>
                <td data-label="Owner">{listing.user?.name || "N/A"}</td>
                <td data-label="Email">{listing.user?.email || "N/A"}</td>
                <td data-label="Actions">
                  <button className="admin-btn danger" onClick={() => deleteListing(listing.id)}>
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

export default AdminListings;