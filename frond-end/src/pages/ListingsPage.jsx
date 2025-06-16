import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./../styles/ListingsPage.css";
import "./../styles/HeaderGlobal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faFilter } from "@fortawesome/free-solid-svg-icons";
import { userMenuItems } from "../constants/menuItems";

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
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarToggle = (isOpen) => setIsSidebarOpen(isOpen);
  const [filteredListings, setFilteredListings] = useState([]);
  const [filters, setFilters] = useState({ category: "", date: "" });
  const location = useLocation();


  useEffect(() => {
    const fetchListings = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("userToken"); 

        if (!token) {
          setError("Not authorized. Please log in.");
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_URL}/api/listings`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
        });

        const data = await response.json();
        if (response.ok) {
          setListings(data);
          setFilteredListings(data);
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


  // const totalPages = Math.ceil(listings.length / listingsPerPage);
  // const startIndex = (currentPage - 1) * listingsPerPage;
  // const endIndex = startIndex + listingsPerPage;
  // const currentListings = listings.slice(startIndex, endIndex);

  const totalPages = Math.ceil((filteredListings.length > 0 ? filteredListings : listings).length / listingsPerPage);
  const startIndex = (currentPage - 1) * listingsPerPage;
  const endIndex = startIndex + listingsPerPage;
  const currentListings = (filteredListings.length > 0 ? filteredListings : listings).slice(startIndex, endIndex);
  const [flashMessage, setFlashMessage] = useState("");
  const [flashType, setFlashType] = useState("success"); // "success" or "error"

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };


  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
  
    const filtered = value
      ? listings.filter((listing) => listing.category.toLowerCase() === value.toLowerCase())
      : listings;
  
    setFilters({ ...filters, [name]: value });
    setFilteredListings(filtered);
    setCurrentPage(1); 
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
        setFilteredListings((prev) => prev.filter((listing) => listing.id !== listingToDelete));
        setFlashMessage("Listing deleted successfully");
        setFlashType("success");
      } else {
        const data = await response.json();
        setFlashMessage(`Error deleting listing: ${data.message}`);
        setFlashType("error");
      }
      setTimeout(() => setFlashMessage(""), 4000);
    } catch (error) {
      setFlashMessage("Failed to delete listing. Please try again.");
      setFlashType("error");
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

  useEffect(() => {
    if (window.innerWidth <= 576) {
      setIsSidebarOpen(false);
    }
  }, [location]);


  return (
    <div className="listings-page main-layout-sidebar main-content-header">
      <div
        className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <Sidebar menuItems={userMenuItems} activeMenu="Listings" onToggle={handleSidebarToggle} onLinkClick={() => setIsSidebarOpen(false)} />
      </div>
      {isSidebarOpen && window.innerWidth <= 576 && (
        <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />
      )}
      <main className="listings-content">
        <h1>All Listings</h1>
        <a href="/add-listing" className="add-listing-link">Add a Listing</a>
  
        {/* Filter Section */}
        <div className="custom-filter d-flex align-items-center">
          <span>Filter</span>
          {/* <FontAwesomeIcon icon={faFilter} className="filter-icon" /> */}
          <select name="category" onChange={handleFilterChange} className="filter-select">
            <option value="">All Categories</option>
            <option value="product">Product</option>
            <option value="service">Service</option>
          </select>
        </div>

        {flashMessage && (
          <div className={`flash-message ${flashType}`}>
            {flashMessage}
          </div>
        )}
          
        {/* Determine active dataset */}
        {loading ? (
          <p>Loading listings...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            {/* Show message when no matching results */}
            {(filters.category && filteredListings.length === 0) ? (
              <p className="custom-no-filtered-listings text-center">
                No {filters.category} listings available.
              </p>
            ) : (
              <div
                className="listings-grid"
                // style={{
                //   display: "grid",
                //   gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
                //   gap: "20px",
                // }}
              >
                {(filteredListings.length > 0 ? filteredListings : listings)
                  .slice((currentPage - 1) * listingsPerPage, currentPage * listingsPerPage)
                  .map((listing) => (
                    <div
                      key={listing.id}
                      className="listing-card-listing"
                      onClick={() => navigate(`/listing/${listing.id}`, { state: { from: "/listings" } })}
                    >
                      <img
                        src={listing.coverImage || ""}
                        alt={listing.title}
                        className="listing-img"
                      />
                      <div className="listing-details">
                        <p className="listing-title">{listing.title}</p>
                        <p className="listing-price">${listing.price}</p>
                        <span className={`listing-status ${listing.status?.toLowerCase() || "active"}`}>
                          {listing.status || "Active"}
                        </span>
                        <span className={`listing-category ${listing.category.toLowerCase()}`}>
                          {listing.category}
                        </span>
                        <div className="listing-actions">
                          <button
                            className="edit-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate(`/edit-listing/${listing.id}`);
                            }}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button
                            className="delete-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleDeleteClick(listing.id);
                            }}
                          >
                            <FontAwesomeIcon icon={faTrash} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </>
        )}
  
        <div className="pagination-controls d-flex">
          <button
            className="btn listing-btn-secondary"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of{" "}
            {Math.ceil(
              (filteredListings.length > 0 ? filteredListings.length : listings.length) /
                listingsPerPage
            )}
          </span>
          <button
            className="btn listing-btn-secondary"
            onClick={handleNextPage}
            disabled={
              currentPage ===
              Math.ceil(
                (filteredListings.length > 0 ? filteredListings.length : listings.length) /
                  listingsPerPage
              )
            }
          >
            Next
          </button>
        </div>
      </main>
  
      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}

export default ListingsPage;
