import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/LandingPage.css";
import logo from "./../assets/images/sslogo.png";

function LandingPage() {
  const [listings, setListings] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterCampus, setFilterCampus] = useState("");
  const [filterPrice, setFilterPrice] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const handleViewDetails = (listingId) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      navigate(`/listings/${listingId}`);
    } else {
      navigate("/login");
    }
  };

  const fetchListings = async () => {
    try {
      const res = await fetch(`${API_URL}/api/listings/all`);
      if (!res.ok) throw new Error("Failed to fetch listings");
      const data = await res.json();
      setListings(data);
      setSearchResults(data);
    } catch (error) {
      console.error("Error fetching listings:", error);
      setListings([]);
      setSearchResults([]);
    }
  };

  const handleSearch = async () => {
    try {
      const res = await fetch(`${API_URL}/api/listings/search?query=${searchQuery}`);
      if (!res.ok) throw new Error("Failed to fetch search results");
      const data = await res.json();
      setSearchResults(data);
      setCurrentPage(1);
    } catch (error) {
      console.error("Error searching listings:", error);
    }
  };

  const applyFilters = (list) => {
    return list.filter((item) => {
      const matchesCampus = filterCampus ? item.user?.campus === filterCampus : true;
      const matchesPrice = filterPrice ? parseFloat(item.price) <= parseFloat(filterPrice) : true;
      return matchesCampus && matchesPrice;
    });
  };

  const paginatedListings = (list) => {
    const startIdx = (currentPage - 1) * itemsPerPage;
    return list.slice(startIdx, startIdx + itemsPerPage);
  };

  const handlePageChange = (direction) => {
    if (direction === "next" && currentPage < Math.ceil(applyFilters(searchResults).length / itemsPerPage)) {
      setCurrentPage(currentPage + 1);
    } else if (direction === "prev" && currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  const campuses = [...new Set(listings.map((l) => l.user?.campus).filter(Boolean))];

  return (
    <div className="container-fluid text-white landing-page">
      {/* Header */}
      <header className="py-4 text-center landing-header">
        <img src={logo} alt="Student Shelf Logo" className="logo-img mb-3" />
        <h1 className="display-4">STUDENT SHELF</h1>
        <p className="lead mb-0">From Students, for Students</p>
      </header>

      {/* Hero Section */}
      <section className="hero-section text-center py-5">
        <h2 className="mb-3">Buy, Sell, and Connect in One Place</h2>
        <p className="lead mb-4">
        Student Shelf is a dynamic student marketplace designed to help you buy, sell, and connect with ease whether it’s finding the perfect product, offering your services, or discovering great deals, all within a trusted student community.
        </p>
        <div className="d-flex justify-content-center gap-3 login-register-btns">
          <Link to="/register" className="btn btn-success btn-lg">Register</Link>
          <Link to="/login" className="btn btn-info btn-lg">Login</Link>
        </div>
      </section>


      <section className="container py-5 browse-listings">
        <h3 className="text-center mb-4">Browse Listings</h3>

        {/* Search Bar */}
        <div className="row mb-4 landing-filter">
          <div className="col-md-3 mb-2">
            <input
              type="text"
              className="form-control landing-form-control"
              placeholder="Search listings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleSearch();
                }
              }}
            />
          </div>
          {/* <button onClick={handleSearch} className="">
            Search
          </button> */}
          <div className="col-md-3 mb-2">
            <select
              className="form-select landing-form-select"
              value={filterCampus}
              onChange={(e) => setFilterCampus(e.target.value)}
            >
              <option value="">All Campuses</option>
              {campuses.map((campus, idx) => (
                <option key={idx} value={campus}>{campus}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3 mb-2">
            <input
              type="number"
              className="form-control landing-form-control"
              placeholder="Max Price"
              value={filterPrice}
              onChange={(e) => setFilterPrice(e.target.value)}
            />
          </div>
        </div>

        {/* Listings */}
        <div className="row">
          {applyFilters(searchResults).length > 0 ? (
            paginatedListings(applyFilters(searchResults)).map((listing) => (
              <div key={listing.id} className="col-sm-6 col-md-4 mb-4">
                <div className="card listing-card h-100">
                  <img src={`${API_URL}${listing.coverImage}`} alt={listing.title} />
                  <div className="card-body-landing">
                    <h5 className="card-title-landing">{listing.title}</h5>
                    <p className="card-text-landing">${listing.price}</p>
                    <button className="btn btn-primary btn-sm" onClick={() => handleViewDetails(listing.id)}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No listings available yet.</p>
          )}
        </div>

        {/* Pagination */}
        {applyFilters(searchResults).length > itemsPerPage && (
          <div className="d-flex justify-content-center mt-3 pagination-controls-landing">
            <button
              className="btn btn-outline-light me-2 prev-pagination-btn"
              onClick={() => handlePageChange("prev")}
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <button
              className="btn btn-outline-light next-pagination-btn"
              onClick={() => handlePageChange("next")}
              disabled={currentPage === Math.ceil(applyFilters(searchResults).length / itemsPerPage)}
            >
              Next
            </button>
          </div>
        )}
      </section>

      {/* Contact Section */}
      <section className="container py-5 text-center" id="contact">
        <h2 className="mb-4">Contact Us</h2>
        <p>Email: support@studentshelf.com</p>
        <p>Phone: +1 234 567 8901</p>
      </section>

      <footer className="py-3 text-center">
        <p className="mb-0">&copy; 2024 studentshelf.com | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default LandingPage;