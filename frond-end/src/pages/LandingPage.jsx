import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./../styles/LandingPage.css";
import logo from "./../assets/images/sslogo.png";

function LandingPage() {
  const [listings, setListings] = useState([]);
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


  useEffect(() => {
    const fetchListings = async () => {
      try {
        const res = await fetch(`${API_URL}/api/listings/all`);
        if (!res.ok) throw new Error("Failed to fetch listings");
  
        const data = await res.json();
        setListings(data);
      } catch (error) {
        console.error("Error fetching listings:", error);
        setListings([]);
      }
    };
  
    fetchListings();
  }, []);

  return (
    <div className="container-fluid text-white landing-page">
      {/* Header */}
      <header className="py-4 text-center">
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
        <div className="d-flex justify-content-center gap-3">
          <Link to="/register" className="btn btn-success btn-lg">Register</Link>
          <Link to="/login" className="btn btn-info btn-lg">Login</Link>
        </div>
      </section>

      {/* Listings Section */}
      <section className="container py-5">
        <h3 className="text-center mb-4">Browse Listings</h3>
        <div className="row">
          {listings.length > 0 ? (
            listings.map((listing) => (
              <div key={listing.id} className="col-sm-6 col-md-4 mb-4">
                <div className="card listing-card h-100">
                <img src={`${API_URL}${listing.coverImage}`} alt={listing.title} />
                  <div className="card-body">
                    <h5 className="card-title">{listing.title}</h5>
                    <p className="card-text">${listing.price}</p>
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
      </section>

      {/* Contact Section */}
      <section className="container py-5 text-center" id="contact">
        <h2 className="mb-4">Contact Us</h2>
        <p>Email: support@studentshelf.com</p>
        <p>Phone: +1 234 567 8901</p>
      </section>

      {/* Footer */}
      <footer className="py-3 text-center">
        <p className="mb-0">&copy; 2024 studentshelf.com | All Rights Reserved</p>
      </footer>
    </div>
  );
}

export default LandingPage;