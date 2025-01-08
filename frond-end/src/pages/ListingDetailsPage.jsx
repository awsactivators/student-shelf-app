import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faMessage, faStar } from "@fortawesome/free-solid-svg-icons";
import "./../styles/ListingDetailsPage.css";
import braceletOne from "./../assets/images/bracelet1.png";
import braceletTwo from "./../assets/images/bracelet2.png";
import braceletThree from "./../assets/images/bracelet3.png";
import braceletFour from "./../assets/images/bracelet4.png";
import braceletFive from "./../assets/images/bracelet5.png";

function ListingDetailsPage() {
  const menuItems = [
    {
      label: "Search",
      submenu: [
        { label: "Listing", path: "/search" },
        { label: "Product/Service", path: "/product-service" },
      ],
    },
  ];

  const sampleListing = {
    id: 1,
    title: "Handmade Bracelet",
    price: "$20",
    description: "Hand made beaded bracelet and earring.",
    images: [
      braceletOne,
      braceletTwo,
      braceletThree,
      braceletFour,
      braceletFive,
    ],
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
          className={i <= Math.round(rating) ? "seller-filled-star" : "seller-empty-star"}
        />
      );
    }
    return stars;
  };

  

  return (
    <div className="search-listing-details-page">
      <Sidebar menuItems={menuItems} activeMenu="Product/Service" />
      <main className="search-listing-details-content">
        {/* Images Section */}
        <div className="search-images-section">
          <div className="search-cover-image">
            <img src={sampleListing.images[0]} alt="Main Listing" onClick={openModal} />
          </div>
          <div className="search-thumbnail-images">
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
        <h1 className="search-listing-title">{`${sampleListing.title} - ${sampleListing.price}`}</h1>

        {/* Description */}
        <p className="search-listing-description">
          <strong>Description:</strong> {sampleListing.description}
        </p>

        {/* Seller Info */}
        <div className="search-seller-info">
          <h2>
            Seller Info <Link to={`/seller`} className="seller-link-icon"> <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> </Link>
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
            <span className="seller-rating-stars">{renderStars(sampleListing.seller.rating)}</span>
          </p>
          <p>
            <strong>Active Listings:</strong> {sampleListing.seller.activeListings}
          </p>
        </div>

        {/* Buttons */}
        <div className="search-action-buttons">
          <button className="search-message-seller-btn">
            <Link to={`/message`} className="search-message-icon-btn"><FontAwesomeIcon icon={faMessage} /> Message Seller </Link>
          </button>
          <button className="search-buy-now-btn"><Link to={`/order`}>Buy Now</Link></button>
        </div>

        {/* Modal for Image Viewing */}
        {isModalOpen && (
          <div className="search-image-modal" onClick={closeModal}>
            <div className="search-modal-content" onClick={(e) => e.stopPropagation()}>
              {/* Horizontal Scrollable Images */}
              <div className="search-modal-thumbnails">
                {sampleListing.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Modal Image ${index + 1}`}
                    onClick={() => openFocusedView(image)}
                  />
                ))}
              </div>

              {/* Close Button */}
              <button className="search-modal-close" onClick={closeModal}>
                ✖
              </button>

              {/* Focused Image View */}
              {focusedImage && (
                <div className="search-focused-view">
                  <img src={focusedImage} alt="Focused" />
                  <button className="search-focused-close" onClick={closeFocusedView}>
                    ✖
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ListingDetailsPage;
