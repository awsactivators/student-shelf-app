import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./../styles/ListingsPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

function ListingsPage() {
  const API_URL = import.meta.env.VITE_API_URL;
  const listingsPerPage = 12;
  const [listings, setListings] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchListings = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch(`${API_URL}/api/listings`);
  //       const data = await response.json();
  //       if (response.ok) {
  //         setListings(data);
  //       } else {
  //         setError(data.message || "Failed to load listings");
  //       }
  //     } catch (error) {
  //       setError("An error occurred while fetching listings");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchListings();
  // }, [API_URL]);


  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("userToken"); // Get the token

        if (!token) {
          setError("Not authorized. Please log in.");
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_URL}/api/listings`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token
          },
        });

        const data = await response.json();
        if (response.ok) {
          setListings(data);
        } else {
          setError(data.message || "Failed to load listings");
        }
      } catch (error) {
        setError("An error occurred while fetching listings");
      } finally {
        setLoading(false);
      }
    };

    fetchListings();
  }, [API_URL]);


  const totalPages = Math.ceil(listings.length / listingsPerPage);
  const startIndex = (currentPage - 1) * listingsPerPage;
  const endIndex = startIndex + listingsPerPage;
  const currentListings = listings.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleEditListing = (listingId) => {
    navigate(`/edit-listing/${listingId}`, { state: { fromListings: true } });
  };

  const handleDeleteClick = (listingId) => {
    setListingToDelete(listingId);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = async () => {
    if (!listingToDelete) return;

    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch(`${API_URL}/api/listings/${listingToDelete}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.ok) {
        setListings((prev) => prev.filter((listing) => listing.id !== listingToDelete));
      } else {
        const data = await response.json();
        alert(`Error deleting listing: ${data.message}`);
      }
    } catch (error) {
      alert("Failed to delete listing. Please try again.");
    } finally {
      setShowDeleteModal(false);
      setListingToDelete(null);
    }
  };

  const DeleteConfirmationModal = ({ show, onClose, onConfirm }) => {
    if (!show) return null;
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2>Confirm Deletion</h2>
          <p>Are you sure you want to delete this listing?</p>
          <div className="modal-actions">
            <button onClick={onConfirm} className="delete-confirm-btn">Yes, Delete</button>
            <button onClick={onClose} className="delete-cancel-btn">Cancel</button>
          </div>
        </div>
      </div>
    );
  };

  const menuItems = [
    {
      label: "Profile",
      submenu: [
        { label: "User Info", path: "/user-info" },
        { label: "Password", path: "/password" },
        { label: "Listings", path: "/listings" },
        { label: "Settings", submenu: [], path: "/settings" },
        { label: "Notifications", path: "/notifications" },
        { label: "Support", path: "/support/faqs" },
        { label: "Terms Policy", path: "/agreement/terms" }
      ],
    },
  ];

  return (
    <div className="listings-page">
      <Sidebar menuItems={menuItems} activeMenu="Listings" />
      <main className="listings-content">
        <h1>All Listings</h1>
        <a href="/add-listing" className="add-listing-link">Add a Listing</a>
        {loading ? (
          <p>Loading listings...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <div className="listings-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "20px" }}>
            {currentListings.map((listing) => (
              <Link to={`/listing/${listing.id}`} key={listing.id} className="listing-card-link">
                <div key={listing.id} className="listing-card">
                  <img src={listing.coverImage ? `${API_URL}${listing.coverImage}` : ""} alt={listing.title} className="listing-img" />
                  <div className="listing-details">
                    <p className="listing-title">{listing.title}</p>
                    <p className="listing-price">${listing.price}</p>
                    <span className={`listing-status ${listing.status?.toLowerCase() || "active"}`}>{listing.status || "Active"}</span>
                    <span className={`listing-category ${listing.category.toLowerCase()}`}>{listing.category}</span>
                    <div className="listing-actions">
                      <button className="edit-btn" onClick={() => handleEditListing(listing.id)}>
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button className="delete-btn" onClick={() => handleDeleteClick(listing.id)}>
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        <div className="pagination-controls d-flex justify-content-between">
          <button className="btn listing-btn-secondary" onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button className="btn listing-btn-secondary" onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
        </div>
      </main>
      <DeleteConfirmationModal show={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={handleDeleteConfirm} />
    </div>
  );
}

export default ListingsPage;
