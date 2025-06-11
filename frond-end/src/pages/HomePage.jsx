import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/HomePage.css";
import "./../styles/HeaderGlobal.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faFilter } from "@fortawesome/free-solid-svg-icons";
import defaultLogo from "../assets/images/default-logo.jpg";

function HomePage() {
  const [userData, setUserData] = useState(null);
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [filters, setFilters] = useState({ category: "", campus: "", price: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("userToken");
      if (!token) return navigate("/login");
      const res = await fetch(`${API_URL}/api/users/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      if (res.ok) setUserData(data);
    };

    const fetchAllListings = async () => {
      const res = await fetch(`${API_URL}/api/listings/all`);
      const data = await res.json();
      if (res.ok) {
        setListings(data);
        setFilteredListings(data);
      }
    };

    fetchUserData();
    fetchAllListings();
  }, [navigate, API_URL]);

  const applyFilters = () => {
    let updated = [...listings];
    if (filters.category)
      updated = updated.filter(l => l.category.toLowerCase() === filters.category.toLowerCase());
    if (filters.campus)
      updated = updated.filter(l => l.user?.campus === filters.campus);
    if (filters.price)
      updated = updated.filter(l => parseFloat(l.price) <= parseFloat(filters.price));
    setFilteredListings(updated);
    setCurrentPage(1);
  };

  useEffect(() => {
    applyFilters();
  }, [filters]); 

  const paginatedListings = () => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredListings.slice(start, start + itemsPerPage);
  };

  const campuses = [...new Set(listings.map(l => l.user?.campus).filter(Boolean))];
  const categories = [...new Set(listings.map(l => l.category).filter(Boolean))];

  return (
    <div className="custom-home container main-content-header">
      <div className="custom-home-header-container d-flex justify-content-between align-items-center">
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
      <div>
        <Link to={"/favorites"} className="favorite-home-btn">My Favorites</Link>
      </div>

      <div className="custom-listings">
        <h2>All Listings</h2>
        <Link to="/add-listing" className="custom-add-listing">
          Add a Listing
        </Link>

        {listings.length === 0 ? (
          <p>No listings yet. Add a listing to get started!</p>
        ) : (
          <>
            <div className="custom-filter-home d-flex align-items-center mb-3">
              <span>Filter: </span>
              {/* <FontAwesomeIcon icon={faFilter} className="filter-icon" /> */}

              <select
                name="category"
                onChange={e => setFilters({ ...filters, category: e.target.value })}
                className="filter-select"
              >
                <option value="">All Categories</option>
                {categories.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>

              <select
                name="campus"
                onChange={e => setFilters({ ...filters, campus: e.target.value })}
                className="filter-select ms-2"
              >
                <option value="">All Campuses</option>
                {campuses.map((c, i) => (
                  <option key={i} value={c}>{c}</option>
                ))}
              </select>

              <input
                type="number"
                placeholder="Max Price"
                className="filter-select ms-2"
                value={filters.price}
                onChange={e => setFilters({ ...filters, price: e.target.value })}
              />
            </div>

            <div className="custom-grid">
              {paginatedListings().map((l) => (
                <div key={l.id} className="listing-card-home" onClick={() => navigate(`/listing/${l.id}`, { state: { from: "/home" } })}>
                  <img src={l.coverImage} alt={l.title} className="listing-img-home" />
                  <div className="listing-details">
                    <p className="listing-title">{l.title}</p>
                    <p className="listing-price">${l.price}</p>
                    <span className="listing-category">{l.category}</span>
                  </div>
                </div>
              ))}
            </div>

            {filteredListings.length > itemsPerPage && (
              <div className="d-flex justify-content-center mt-3">
                <button
                  className="btn btn-outline-light me-2 paignation-btn"
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                >
                  Prev
                </button>
                <button
                  className="btn btn-outline-light paignation-btn"
                  onClick={() => setCurrentPage(p => p + 1)}
                  disabled={currentPage === Math.ceil(filteredListings.length / itemsPerPage)}
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default HomePage;