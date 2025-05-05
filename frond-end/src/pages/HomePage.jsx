import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/HomePage.css";
import "./../styles/HeaderGlobal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import defaultLogo from "../assets/images/default-logo.jpg";

function HomePage() {
  const [userData, setUserData] = useState(null);
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [filters, setFilters] = useState({ category: "", date: "" });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [listingToDelete, setListingToDelete] = useState(null);


  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setError("Not authorized. Please log in.");
        navigate("/login");
        return;
      }

      try {
        console.log("Fetching user data...");
        const response = await fetch(`${API_URL}/api/users/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();
        console.log("User data response:", data);

        if (response.ok) {
          setUserData(data);
        } else {
          console.error("Error fetching user data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };


    const fetchListings = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        setError("Not authorized. Please log in.");
        return;
      }
    
      try {
        const response = await fetch(`${API_URL}/api/listings`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
    
        const data = await response.json();
        
        if (response.ok) {
          setListings(Array.isArray(data) ? data : []); // Ensure it's an array
          setFilteredListings(Array.isArray(data) ? data : []); // Ensure it's an array
        } else {
          console.error("Error fetching listings:", data.message);
          setListings([]); // Set empty array if no listings
          setFilteredListings([]); // Prevent TypeError
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
        setListings([]); // Prevent TypeError if error occurs
        setFilteredListings([]);
      }
    };

    fetchUserData();
    fetchListings();
  }, [navigate, API_URL]);


  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
  
    // Filter listings based on category
    let filtered = listings.filter(
      (listing) => !value || listing.category.toLowerCase() === value.toLowerCase()
    );
  
    setFilters({ ...filters, [name]: value });
    setFilteredListings(filtered);
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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        setListings((prev) => prev.filter((listing) => listing.id !== listingToDelete));
        setFilteredListings((prev) => prev.filter((listing) => listing.id !== listingToDelete));
      } else {
        const data = await response.json();
        alert(`Error deleting listing: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
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
  
  

  return (
    <div className="custom-home container main-content-header">
      {/* Welcome Section */}
      <div className="custom-home-header d-flex justify-content-between align-items-center">
        <h1>
          Welcome <span className="custom-user-name">{userData?.name || ""}</span>!
        </h1>
        <Link to={"/user-info"}>
          <img
            src={userData?.profileImage || defaultLogo}
            alt="User Profile"
            className="custom-user-profile-img"
          />
        </Link>
      </div>

      {/* Listings Section */}
      <div className="custom-listings">
        <h2>Listings</h2>

        {/* Show empty state when no listings at all (for new users) */}
        {listings.length === 0 ? (
          <div className="custom-empty-listing text-center">
            <p>No listings yet.</p>
            <p>Search for a product or service, or start selling!</p>
            <button className="add-listing-link-btn">
              <Link to="/add-listing" className="add-listing-link">
                Add a Listing
              </Link>
            </button>
          </div>
        ) : (
          <div className="custom-listings-grid">
            {/* Filter Section */}
            <div className="custom-filter d-flex align-items-center">
              <span>Filter</span>
              <FontAwesomeIcon icon={faFilter} className="filter-icon" />
              <select name="category" onChange={handleFilterChange} className="filter-select">
                <option value="">All Categories</option>
                <option value="product">Product</option>
                <option value="service">Service</option>
              </select>
            </div>

            {/* Show message when a filter is applied but no matching results */}
            {filteredListings.length === 0 && listings.length > 0 && (
              <p className="custom-no-filtered-listings text-center">
                No {filters.category} listings available.
              </p>
            )}

            {/* Listings Grid */}
            <div className="custom-grid">
              {filteredListings.slice(0, 3).map((listing) => (
                <div
                  key={listing.id}
                  className="listing-card"
                  onClick={() => navigate(`/listing/${listing.id}`)}
                >
                  <img
                    src={listing.coverImage ? `${API_URL}${listing.coverImage}` : defaultImage}
                    alt={listing.title}
                    className="listing-img"
                  />
                  <div className="listing-details">
                    <p className="listing-title">{listing.title}</p>
                    <p className="listing-price">${listing.price}</p>
                    <div className="listing-status-category">
                      <span className={`listing-status ${listing.status?.toLowerCase() || "active"}`}>
                        {listing.status || "Active"}
                      </span>
                      <span className={`listing-category ${listing.category.toLowerCase()}`}>
                        {listing.category}
                      </span>
                    </div>
                    <div className="listing-actions">
                      {/* Edit Button */}
                      <button
                        className="edit-btn"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/edit-listing/${listing.id}`);
                        }}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>

                      {/* Delete Button */}
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

            {/* View All Link */}
            {filteredListings.length > 3 && (
              <Link to="/listings" className="custom-view-all active-link">
                View All
              </Link>
            )}

            <Link to="/add-listing" className="custom-add-listing">
              Add a Listing
            </Link>
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmationModal
        show={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );

}

export default HomePage;
