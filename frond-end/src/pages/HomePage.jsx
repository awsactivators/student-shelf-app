import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/HomePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
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
    setFilters({ ...filters, [name]: value });

    let filtered = listings;

    if (filters.category) {
      filtered = filtered.filter((listing) => listing.category === filters.category);
    }

    if (filters.date) {
      filtered = filtered.filter((listing) => new Date(listing.createdAt) >= new Date(filters.date));
    }

    setFilteredListings(filtered);
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
                <option value="Wigs">Wigs</option>
                <option value="Braids">Braids</option>
                <option value="Hair Services">Hair Services</option>
              </select>

              <input type="date" name="date" onChange={handleFilterChange} className="filter-date" />
            </div>

            {/* Listings Grid */}
            <div className="custom-grid">
              {filteredListings.slice(0, 5).map((listing) => (
                <div key={listing.id} className="custom-card">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="custom-card-img"
                  />
                  <p className="custom-card-title">{listing.title}</p>
                  <p className="custom-card-price">{listing.price}</p>
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

            <button className="btn custom-add-listing">
              <Link to="/add-listing">Add a Listing</Link>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;
