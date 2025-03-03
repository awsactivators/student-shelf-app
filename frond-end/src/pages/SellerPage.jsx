import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./../styles/SellerPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faMessage, faStar } from "@fortawesome/free-solid-svg-icons";
import defaultLogo from "./../assets/images/default-logo.jpg";

function SellerPage() {
  const { sellerId } = useParams();  
  const API_URL = import.meta.env.VITE_API_URL;
  const [seller, setSeller] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSeller = async () => {
      if (!sellerId || isNaN(sellerId)) {
        setError("Invalid seller ID");
        setLoading(false);
        return;
      }

      try {
        const token = localStorage.getItem("userToken");

        if (!token) {
          setError("Not authorized. Please log in.");
          setLoading(false);
          return;
        }

        console.log("Fetching seller with ID:", sellerId);

        const response = await fetch(`${API_URL}/api/sellers/${sellerId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        console.log("Fetched Seller Data:", JSON.stringify(data, null, 2)); // Debugging

        if (response.ok) {
          setSeller({
            ...data,
            activeListings: data.userListings || [], 
          });
        } else {
          setError(data.message || "Seller not found");
        }
      } catch (error) {
        setError("An error occurred while fetching seller details");
      } finally {
        setLoading(false);
      }
    };

    fetchSeller();
  }, [sellerId, API_URL]);

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={i <= Math.round(rating) ? "sellerinfo-filled-star" : "sellerinfo-empty-star"}
        />
      );
    }
    return stars;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return `${date.toLocaleString("en-US", { month: "long" })} ${date.getDate()}, ${date.getFullYear()}`;
  };

  if (loading) return <p>Loading seller details...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!seller) return <p>Seller not found</p>;

  console.log("Seller profile image:", seller.profileImage);
  console.log("Full API response:", seller);



  return (
    <div className="sellerinfo-seller-page">
      <div className="sellerinfo-seller-header">
        <div>
          <button className="sellerinfo-follow-btn">Follow</button>
        </div>
        <img
          src={seller.profileImage || defaultLogo}
          alt="Seller Profile"
          className="sellerinfo-seller-profile-img"
          onError={(e) => {
            e.target.onerror = null; // Prevent infinite loop
            e.target.src = defaultLogo; // Set default image if error occurs
          }}
        />
        <h1 className="sellerinfo-seller-name">
          {seller.name}{" "}
          {seller.isVerified && <FontAwesomeIcon icon={faCheckCircle} className="sellerinfo-verified-icon" />}
        </h1>
      </div>

      <div className="seller-detail-container">
        <div className="sellerinfo-seller-details">
          <p><strong>Campus:</strong> {seller.campus || "Not provided"}</p>
          <p><strong>Member Since:</strong> {formatDate(seller.createdAt)}</p>
          <p><strong>Overall Rating:</strong> <span className="sellerinfo-rating-stars">{renderStars(seller.rating || 0)}</span></p>
          <p><strong>Bio:</strong> {seller.bio || "No bio available"}</p>
          <p><strong>Policies:</strong> {seller.policy || "No policies listed"}</p>
        </div>

        <p><strong>Member Since:</strong> {new Date(seller.createdAt).toLocaleDateString()}</p>

        <div className="sellerinfo-active-listings">
          <h2>Active Listings:</h2>
          {seller.userListings?.length > 0 ? (
            <div className="sellerinfo-listings-grid">
              {seller.userListings.slice(0, 4).map((listing, index) => (
                <Link to={`/listing/${listing.id}`} key={index}>
                  <img
                    src={`${API_URL}${listing.coverImage}`}
                    alt={`Active Listing ${index + 1}`}
                    className="sellerinfo-listing-img"
                  />
                </Link>
              ))}
            </div>
          ) : (
            <p>No active listings</p>
          )}
          {seller.activeListings?.length > 4 && (
            <Link to={`/seller/${sellerId}/listings`} className="sellerinfo-view-all-link">
              View All
            </Link>
          )}
        </div>

        <div className="sellerinfo-reviews-section">
          <h2>Reviews:</h2>
          {seller.userReviews?.length > 0 ? (
            <div className="sellerinfo-reviews-list">
              {seller.userReviews.map((review, index) => (
                <div key={index} className="sellerinfo-review-item">
                  <p className="sellerinfo-review-text">{review.text}</p>
                  <p className="sellerinfo-reviewer-name">- {review.reviewer} ({review.rating}⭐)</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No reviews yet</p>
          )}
        </div>

        <div className="sellerinfo-action-buttons">
          <button className="sellerinfo-message-btn">
            <Link to={`/message?sellerId=${sellerId}`} className="seller-message-icon-btn">
              <FontAwesomeIcon icon={faMessage} /> Send a Message
            </Link>
          </button>
          <button className="sellerinfo-leave-review-btn">
            <Link to={`/leave-review?sellerId=${sellerId}`} className="seller-leave-review-icon-btn">
              Leave a Review
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SellerPage;
