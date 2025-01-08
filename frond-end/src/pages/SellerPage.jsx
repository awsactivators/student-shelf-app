import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./../styles/SellerPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle, faMessage, faStar } from "@fortawesome/free-solid-svg-icons";
import braceletOne from "./../assets/images/bracelet1.png";
import braceletTwo from "./../assets/images/bracelet2.png";
import braceletThree from "./../assets/images/bracelet3.png";
import braceletFour from "./../assets/images/bracelet4.png";
import sellerProile from "./../assets/images/seller-avatar.png";

function SellerPage() {
  const reviewsContainerRef = useRef(null);

  const sellerData = {
    name: "James James",
    profilePicture: sellerProile, 
    isVerified: true,
    campus: "North",
    memberSince: "July 13, 2024",
    rating: 4,
    bio: "I make all kinds of jewellery by hand",
    policies: "Refunds only within 2 days of purchase with item intact",
    activeListings: [
      braceletOne,
      braceletTwo,
      braceletThree,
      braceletFour,
      braceletFour,
    ],
    reviews: [
      { text: "James is a good seller and provides great service!", reviewer: "Sarah M." },
      { text: "Good quality product and fast delivery.", reviewer: "Michael J." },
      { text: "Delivers on time and is very professional.", reviewer: "Anna K." },
      { text: "Very creative jewelries with amazing designs.", reviewer: "John D." },
      { text: "Excellent customer service and reliable.", reviewer: "Emily R." },
    ],
  };

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

  const scrollReviews = (direction) => {
    const container = reviewsContainerRef.current;
    if (container) {
      const scrollAmount = direction === "left" ? -300 : 300;
      container.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };


  return (
    <div className="sellerinfo-seller-page">
      {/* Profile Section */}
      <div className="sellerinfo-seller-header">
        <div>
          <button className="sellerinfo-follow-btn">Follow</button>
        </div>
        <img
          src={sellerData.profilePicture}
          alt="sellerinfo-Seller Profile"
          className="sellerinfo-seller-profile-img"
        />
        <div className="ssellerinfo-seller-info">
          <h1 className="sellerinfo-seller-name">
            {sellerData.name}{" "}
            {sellerData.isVerified && (
              <FontAwesomeIcon icon={faCheckCircle} className="sellerinfo-verified-icon" />
            )}
          </h1>
          
        </div>
      </div>

      <div className="seller-detail-container">
        {/* Seller Details */}
        <div className="sellerinfo-seller-details">
          <p>
            <strong>Campus:</strong> {sellerData.campus}
          </p>
          <p>
            <strong>Member Since:</strong> {sellerData.memberSince}
          </p>
          <p>
            <strong>Overall Rating:</strong>{" "}
            <span className="sellerinfo-rating-stars">{renderStars(sellerData.rating)}</span>
          </p>
          <p>
            <strong>Bio:</strong> {sellerData.bio}
          </p>
          <p>
            <strong>Policies:</strong> {sellerData.policies}
          </p>
        </div>

        {/* Active Listings */}
        <div className="sellerinfo-active-listings">
          <h2>Active Listings:</h2>
          <div className="sellerinfo-listings-grid">
            {sellerData.activeListings.slice(0, 4).map((listing, index) => (
              <Link to={`/seller-listing-details/${index + 1}`} key={index}>
                <img
                  src={listing}
                  alt={`Active Listing ${index + 1}`}
                  className="sellerinfo-listing-img"
                />
              </Link>
            ))}
          </div>
          {sellerData.activeListings.length > 4 && (
            <a href="/seller-listings" className="sellerinfo-view-all-link">
              View All
            </a>
          )}
        </div>


        {/* Reviews Section */}
        <div className="sellerinfo-reviews-section">
          <h2>Reviews:</h2>
          <div className="sellerinfo-reviews-container">
            <button
              className="sellerinfo-scroll-btn scroll-left"
              onClick={() => scrollReviews("left")}
            >
              &lt;
            </button>
            <div className="sellerinfo-reviews-list" ref={reviewsContainerRef}>
              {sellerData.reviews.map((review, index) => (
                <div key={index} className="sellerinfo-review-item">
                  <p className="sellerinfo-review-text">{review.text}</p>
                  <p className="sellerinfo-reviewer-name">- {review.reviewer}</p>
                </div>
              ))}
            </div>
            <button
              className="sellerinfo-scroll-btn scroll-right"
              onClick={() => scrollReviews("right")}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

      {/* Send a Message and Leave a Review Buttons */}
      <div className="sellerinfo-action-buttons">
        <button className="sellerinfo-message-btn">
          <Link to={`/message`} className="seller-message-icon-btn">
            <FontAwesomeIcon icon={faMessage} /> Send a Message
          </Link>
        </button>
        <button className="sellerinfo-leave-review-btn">
          <Link to={`/leave-review`} className="seller-leave-review-icon-btn">
            Leave a Review
          </Link>
        </button>
      </div>

    </div>
  );
}

export default SellerPage;
