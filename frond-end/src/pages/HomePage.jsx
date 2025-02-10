import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/HomePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import defaultProfileImage from "./../assets/images/avatar.png";

function HomePage() {
  const [userData, setUserData] = useState(null);
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [filters, setFilters] = useState({ category: "", date: "" });

  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) {
        console.error("No token found, redirecting to login.");
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
      try {
        const response = await fetch(`${API_URL}/api/listings`);
        const data = await response.json();
        if (response.ok) {
          setListings(data);
          setFilteredListings(data);
        } else {
          console.error("Error fetching listings:", data.message);
        }
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchUserData();
    fetchListings();
  }, [navigate, API_URL]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
  
    // Filter the listings based on the selected category
    let filtered = listings;
  
    if (value) {
      filtered = listings.filter((listing) => listing.category.toLowerCase() === value.toLowerCase());
    }
  
    setFilters({ ...filters, [name]: value }); // Update filters state
    setFilteredListings(filtered); // Update filtered listings
  };
  

  const handleEditListing = (listingId) => {
    navigate(`/edit-listing/${listingId}`); // Redirect to an edit page with the listing ID
  };
  
  const handleDeleteListing = async (listingId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this listing?");
    if (!confirmDelete) return;
  
    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch(`${API_URL}/api/listings/${listingId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (response.ok) {
        setListings((prev) => prev.filter((listing) => listing.id !== listingId));
        setFilteredListings((prev) => prev.filter((listing) => listing.id !== listingId));
        alert("Listing deleted successfully!");
      } else {
        const data = await response.json();
        alert(`Error deleting listing: ${data.message}`);
      }
    } catch (error) {
      console.error("Error deleting listing:", error);
      alert("Failed to delete listing. Please try again.");
    }
  };
  

  return (
    <div className="custom-home container">
      {/* Welcome Section */}
      <div className="custom-home-header d-flex justify-content-between align-items-center">
        <h1>
          Welcome <span className="custom-user-name">{userData?.name || "User"}</span>!
        </h1>
        <Link to={"/user-info"}>
          <img
            src={userData?.profileImage || defaultProfileImage}
            alt="User Profile"
            className="custom-user-profile-img"
          />
        </Link>
      </div>

      {/* Listings Section */}
      <div className="custom-listings">
        <h2>Listings</h2>

        {listings.length === 0 ? (
          <div className="custom-empty-listing text-center">
            <p>No listings yet.</p>
            <p>Search for product or service or start selling!</p>
            <button className="btn add-listing-link-btn">
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

            {/* Listings Grid */}
            <div className="custom-grid">
              {filteredListings.slice(0, 5).map((listing) => (
                <div key={listing.id} className="listing-card">
                  <img
                    src={`${API_URL}${listing.coverImage}`}
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
                      <button
                        className="edit-btn"
                        onClick={() => handleEditListing(listing.id)}
                      >
                        <FontAwesomeIcon icon={faEdit} />
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDeleteListing(listing.id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>


            {/* View All Link */}
            {listings.length > 5 ? (
              <Link to="/listings" className="custom-view-all active-link">
                View All
              </Link>
            ) : (
              <span className="custom-view-all inactive-link">View All</span>
            )}

            <Link to="/add-listing" className="custom-add-listing">
              Add a Listing
            </Link>

          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
