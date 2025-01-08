import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faMessage, faStar } from "@fortawesome/free-solid-svg-icons";
import "./../styles/SellerListingDetailsPage.css";
import braceletOne from "./../assets/images/bracelet1.png";
import braceletTwo from "./../assets/images/bracelet2.png";
import braceletThree from "./../assets/images/bracelet3.png";
import braceletFour from "./../assets/images/bracelet4.png";
import braceletFive from "./../assets/images/bracelet5.png";

function SellerListingDetailsPage() {
  const sampleListing = {
    id: 1,
    title: "Handmade Bracelet",
    price: "$20",
    description: "Handmade beaded bracelet and earring.",
    images: [braceletOne, braceletTwo, braceletThree, braceletFour, braceletFive],
    seller: {
      name: "James James",
      lastActive: "25 minutes ago",
      memberSince: "July 4, 2024",
      campus: "North",
      activeListings: 4,
      rating: 4.2,
    },
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [focusedImage, setFocusedImage] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setFocusedImage(null); // Reset focused image
  };

  const openFocusedView = (image) => setFocusedImage(image);
  const closeFocusedView = () => setFocusedImage(null);

  // Generate star ratings based on user rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={i <= Math.round(rating) ? "sellerdet-filled-star" : "sellerdet-empty-star"}
        />
      );
    }
    return stars;
  };


  return (
    <div className="sellerdet-listing-details-page">
      <main className="sellerdet-listing-details-content">
        <button className="sellerdet-go-back-btn">
          <Link to={`/seller-listings`}>← Back to Seller's Listings</Link>
        </button>
        {/* Images Section */}
        <div className="sellerdet-images-section">
          <div className="sellerdet-cover-image">
            <img src={sampleListing.images[0]} alt="Main Listing" onClick={openModal} />
          </div>
          <div className="sellerdet-thumbnail-images">
            {sampleListing.images.slice(1).map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Thumbnail ${index + 1}`}
                onClick={openModal}
              />
            ))}
          </div>
        </div>

        {/* Title and Price */}
        <h1 className="sellerdet-listing-title">{`${sampleListing.title} - ${sampleListing.price}`}</h1>

        {/* Description */}
        <p className="sellerdet-listing-description">
          <strong>Description:</strong> {sampleListing.description}
        </p>

        {/* Seller Info */}
        <div className="sellerdet-info">
          <h2>
            Seller Info{" "}
            <Link to={`/seller`} className="sellerdet-link-icon">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </Link>
          </h2>
          <p>
            <strong>Name:</strong> {sampleListing.seller.name}
          </p>
          <p>
            <strong>Last Active:</strong> {sampleListing.seller.lastActive}
          </p>
          <p>
            <strong>Member Since:</strong> {sampleListing.seller.memberSince}
          </p>
          <p>
            <strong>Campus:</strong> {sampleListing.seller.campus}
          </p>
          <p>
            <strong>Rating:</strong>{" "}
            <span className="sellerdet-rating-stars">{renderStars(sampleListing.seller.rating)}</span>
          </p>
          <p>
            <strong>Active Listings:</strong> {sampleListing.seller.activeListings}
          </p>
        </div>

        {/* Buttons */}
        <div className="sellerdet-action-buttons">
          <button className="sellerdet-message-seller-btn">
            <Link to={`/message`} className="sellerdet-message-icon-btn">
              <FontAwesomeIcon icon={faMessage} /> Message Seller
            </Link>
          </button>
          <button className="sellerdet-buy-now-btn">
            <Link to={`/order`}>Buy Now</Link>
          </button>
        </div>

        {/* Modal for Image Viewing */}
        {isModalOpen && (
                    <div className="sellerdet-image-modal" onClick={closeModal}>
                        <div className="sellerdet-modal-content" onClick={(e) => e.stopPropagation()}>
                            <div className="sellerdet-modal-thumbnails">
                                {sampleListing.images.map((image, index) => (
                                    <img
                                        key={index}
                                        src={image}
                                        alt={`Modal Image ${index + 1}`}
                                        onClick={() => openFocusedView(image)}
                                    />
                                ))}
                            </div>
                            <button className="sellerdet-modal-close" onClick={closeModal}>✖</button>
                        </div>
                    </div>
                )}

                {/* Focused Image View */}
                {focusedImage && (
                    <div className="sellerdet-focused-view">
                        <img src={focusedImage} alt="Focused" />
                        <button className="sellerdet-focused-close" onClick={closeFocusedView}>✖</button>
                    </div>
                )}

      </main>
    </div>
  );
}

export default SellerListingDetailsPage;
