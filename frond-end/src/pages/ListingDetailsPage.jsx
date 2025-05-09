import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faMessage, faStar, faChevronLeft, faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./../styles/ListingDetailsPage.css";
import "./../styles/HeaderGlobal.css";

function ListingDetailsPage() {
  const { id } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const token = localStorage.getItem("userToken");

        if (!token) {
          navigate('/login');
          return;
        }

        // Fetch the current logged-in user data
        const userResponse = await fetch(`${API_URL}/api/users/me`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const userData = await userResponse.json();
        if (userResponse.ok) {
          setCurrentUserId(userData.id); // Store logged-in user's ID
        }

        // Fetch the listing details
        const listingResponse = await fetch(`${API_URL}/api/listings/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const listingData = await listingResponse.json();

        if (listingResponse.ok) {
          const parsedImages = Array.isArray(listingData.images) ? listingData.images : JSON.parse(listingData.images || "[]");
          setListing({
            ...listingData,
            images: parsedImages,
            user: listingData.user || {},
          });
        } else {
          setError(listingData.message || "Listing not found");
        }
      } catch (error) {
        setError("An error occurred while fetching listing details");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, API_URL]);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % listing.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + listing.images.length) % listing.images.length);
  };

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

  if (loading) return <p>Loading listing details...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!listing) return <p>Listing not found</p>;

  console.log("Current User ID:", currentUserId);
  console.log("Seller ID:", listing.user?.id);
  console.log("Full Listing Data:", listing);

  return (
    <div className="search-listing-details-page main-content-header">
      <main className="search-listing-details-content">
        {/* Back to Listings Button */}
        <button className="search-back-btn" onClick={() => navigate("/home")}>
          ← Back to Listings
        </button>

        <div className="search-images-section">
          <div className="search-cover-image">
            <img src={`${API_URL}${listing.coverImage}`} alt="Main Listing" onClick={() => openModal(0)} />
          </div>
          <div className="search-thumbnail-images">
            {listing.images.map((image, index) => (
              <img
                key={index}
                src={`${API_URL}${image}`}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => openModal(index)}
              />
            ))}
          </div>
        </div>

        <h1 className="search-listing-title">{`${listing.title} - $${listing.price}`}</h1>

        <p className="search-listing-description">
          <strong>Description:</strong> {listing.description}
        </p>

        {/* Only show seller info if the logged-in user is NOT the owner */}
        {currentUserId !== listing.user?.id && (
          <div className="search-seller-info">
            <h2 className="search-seller-heading">
              Seller Info
              {listing.user?.id && (
                <Link to={`/seller/${listing.user.id}`} className="seller-link-icon">
                  <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
                </Link>
              )}
            </h2>
            <p><strong>Name:</strong> {listing.user?.name || "Unknown"}</p>
            <p><strong>Campus:</strong> {listing.user?.campus || "Not provided"}</p>
            <p><strong>Rating:</strong> <span className="seller-rating-stars">{renderStars(listing.user?.rating || 0)}</span></p>
            <p><strong>Active Listings:</strong> {listing.user?.activeListings || 0}</p>
          </div>
        )}

        {/* Only show Message & Buy Now buttons if the listing does not belong to the logged-in user */}
        {currentUserId !== listing.user?.id && (
          <div className="search-action-buttons">
            <button className="search-message-seller-btn">
              <Link to={`/message?sellerId=${listing.user?.id}`} className="search-message-icon-btn">
                <FontAwesomeIcon icon={faMessage} /> Message Seller
              </Link>
            </button>
            {/* <button className="search-buy-now-btn">
              <Link to={`/order`}>Buy Now</Link>
            </button> */}
          </div>
        )}

        {isModalOpen && (
          <div className="search-image-modal" onClick={closeModal}>
            <div className="search-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="search-modal-close" onClick={closeModal}><FontAwesomeIcon icon={faTimes} /></button>
              <button className="search-prev-image" onClick={prevImage}><FontAwesomeIcon icon={faChevronLeft} /></button>
              <img src={`${API_URL}${listing.images[currentImageIndex]}`} alt="Expanded" className="search-modal-image" />
              <button className="search-next-image" onClick={nextImage}><FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ListingDetailsPage;

