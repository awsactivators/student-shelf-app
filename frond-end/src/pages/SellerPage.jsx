import React, { useEffect, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import "./../styles/SellerPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faMessage, faStar, faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import defaultLogo from "./../assets/images/default-logo.jpg";

function SellerPage() {
  const { sellerId } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;
  const [seller, setSeller] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const reviewListRef = useRef(null); // Reference for scrolling

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
        console.log("Fetched Seller Data:", JSON.stringify(data, null, 2));

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
    return [...Array(5)].map((_, i) => (
      <FontAwesomeIcon
        key={i}
        icon={faStar}
        className={i < Math.round(rating) ? "sellerinfo-filled-star" : "sellerinfo-empty-star"}
      />
    ));
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown";
    const date = new Date(dateString);
    return `${date.toLocaleString("en-US", { month: "long" })} ${date.getDate()}, ${date.getFullYear()}`;
  };

  const scrollReviews = (direction) => {
    if (reviewListRef.current) {
      const scrollAmount = 250; 
      reviewListRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (loading) return <p>Loading seller details...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!seller) return <p>Seller not found</p>;

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
            e.target.onerror = null;
            e.target.src = defaultLogo;
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

        <div className="sellerinfo-active-listings">
          <h2>Active Listings:</h2>
          {seller.userListings?.length > 0 ? (
            <div className="sellerinfo-listings-grid">
              {seller.userListings.slice(0, 4).map((listing, index) => (
                <Link to={`/seller/${sellerId}/listing/${listing.id}`} key={index}>
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

        {/* Reviews Section with Scrollable Feature */}
        <div className="sellerinfo-reviews-section">
          <h2>Reviews:</h2>
          {seller.reviews?.length > 0 ? (
            <div className="sellerinfo-reviews-container">
              {seller.reviews.length > 3 && (
                <button className="scroll-btn left" onClick={() => scrollReviews("left")}>
                  <FontAwesomeIcon icon={faChevronLeft} />
                </button>
              )}

              <div className="sellerinfo-reviews-list" ref={reviewListRef}>
                {seller.reviews.map((review) => (
                  <div key={review.id} className="sellerinfo-review-item">
                    <p className="sellerinfo-review-text">{review.comment}</p>
                    <p className="sellerinfo-reviewer-name">
                      - {review.buyer?.name || "Anonymous"} ({review.rating}⭐)
                    </p>
                  </div>
                ))}
              </div>

              {seller.reviews.length > 3 && (
                <button className="scroll-btn right" onClick={() => scrollReviews("right")}>
                  <FontAwesomeIcon icon={faChevronRight} />
                </button>
              )}
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
            <Link to={`/leave-review/${seller.id}`} className="seller-leave-review-icon-btn">
              Leave a Review
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
}

export default SellerPage;