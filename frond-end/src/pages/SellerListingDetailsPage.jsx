import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faMessage, faStar, faChevronLeft, faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./../styles/SellerListingDetailsPage.css";
import "./../styles/HeaderGlobal.css";
import FlagModal from "../components/FlagModal";

function SellerListingDetailsPage() {
  const { sellerId, listingId } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showFlagModal, setShowFlagModal] = useState(false);
  const [hasFlagged, setHasFlagged] = useState(false);
  const [flash, setFlash] = useState("");

  // useEffect(() => {
  //   const fetchListing = async () => {
  //     try {
  //       const response = await fetch(`${API_URL}/api/sellers/${sellerId}/listings/${listingId}`);
  //       const data = await response.json();

  //       const flagsRes = await fetch(`${API_URL}/api/flags?listingId=${id}`, {
  //         headers: { Authorization: `Bearer ${token}` },
  //       });
  //       const flagsData = await flagsRes.json();
  //       const alreadyFlagged = flagsData.some(flag => flag.userId === userData.id);
  //       setHasFlagged(alreadyFlagged);

  //       if (response.ok) {
  //         setListing({
  //           ...data,
  //           images: Array.isArray(data.images) ? data.images : JSON.parse(data.images || "[]"),
  //         });
  //       } else {
  //         setError(data.message || "Listing not found");
  //       }
  //     } catch (error) {
  //       setError("An error occurred while fetching listing details");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchListing();
  // }, [sellerId, listingId, API_URL]);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const userData = JSON.parse(localStorage.getItem("userData")); // assuming you stored it
  
        const response = await fetch(`${API_URL}/api/sellers/${sellerId}/listings/${listingId}`);
        const data = await response.json();
  
        if (!response.ok) {
          setError(data.message || "Listing not found");
          return;
        }
  
        const flagsRes = await fetch(`${API_URL}/api/flags?listingId=${listingId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const flagsData = await flagsRes.json();
        const alreadyFlagged = flagsData.some(flag => flag.userId === userData?.id);
        setHasFlagged(alreadyFlagged);
  
        setListing({
          ...data,
          images: Array.isArray(data.images) ? data.images : JSON.parse(data.images || "[]"),
        });
      } catch (error) {
        setError("An error occurred while fetching listing details");
      } finally {
        setLoading(false);
      }
    };
  
    fetchListing();
  }, [sellerId, listingId, API_URL]);

  const handleFlagSubmit = async (reason, comment) => {
    try {
      const token = localStorage.getItem("userToken");
      const res = await fetch(`${API_URL}/api/flags`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reason, comment, listingId: listing.id }),
      });
  
      if (!res.ok) throw new Error("Failed to submit flag");
  
      setFlash("Thank you! Your report has been submitted.");
      setShowFlagModal(false);
  
      setTimeout(() => {
        setFlash("");
        navigate("/home");
      }, 2500);
    } catch (err) {
      setFlash("Error reporting listing. Please try again.");
      setTimeout(() => setFlash(""), 3000);
    }
  };

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
          className={i <= Math.round(rating) ? "sellerdet-filled-star" : "sellerdet-empty-star"}
        />
      );
    }
    return stars;
  };

  if (loading) return <p>Loading listing details...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!listing) return <p>Listing not found</p>;

  return (
    <div className="sellerdet-listing-details-page main-content-header">
      <main className="sellerdet-listing-details-content">
        <button className="sellerdet-go-back-btn">
          <Link to={`/seller/${sellerId}/listings`}>← Back to Seller's Listings</Link>
        </button>

        <div className="sellerdet-images-section">
          <div className="sellerdet-cover-image">
            <img src={`${API_URL}${listing.coverImage}`} alt="Main Listing" onClick={() => openModal(0)} />
          </div>
          <div className="sellerdet-thumbnail-images">
            {listing.images.map((image, index) => (
              <img key={index} src={`${API_URL}${image}`} alt={`Thumbnail ${index + 1}`} onClick={() => openModal(index)} />
            ))}
          </div>
        </div>

        {flash && <div className="flash-message">{flash}</div>}

        <h1 className="sellerdet-listing-title">{`${listing.title} - $${listing.price}`}</h1>
        <p className="sellerdet-listing-description"><strong>Description:</strong> {listing.description}</p>
        {/* <button className="flag-btn" onClick={() => setShowFlagModal(true)}>Report / Flag Listing</button> */}
        {hasFlagged ? (
          <button className="flag-btn-seller disabled" disabled>
            You’ve already flagged this listing
          </button>
        ) : (
          <button className="flag-btn-seller" onClick={() => setShowFlagModal(true)}>
            Report / Flag Listing
          </button>
        )}
        <FlagModal
          show={showFlagModal}
          onClose={() => setShowFlagModal(false)}
          onSubmit={handleFlagSubmit}
        />

        <div className="sellerdet-info">
          <h2>
            Seller Info
            <Link to={`/seller/${sellerId}`} className="sellerdet-link-icon">
              <FontAwesomeIcon icon={faArrowUpRightFromSquare} />
            </Link>
          </h2>
          <p><strong>Name:</strong> {listing.user?.name || "Unknown"}</p>
          <p><strong>Campus:</strong> {listing.user?.campus || "Not provided"}</p>
          <p><strong>Rating:</strong> <span className="sellerdet-rating-stars">{renderStars(listing.user?.rating || 0)}</span></p>
          <p><strong>Active Listings:</strong> {listing.user?.activeListings || 0}</p>
        </div>

        <div className="sellerdet-action-buttons">
          <button className="sellerdet-message-seller-btn">
            <Link to={`/message?sellerId=${sellerId}`} className="sellerdet-message-icon-btn">
              <FontAwesomeIcon icon={faMessage} /> Message Seller
            </Link>
          </button>
          {/* <button className="sellerdet-buy-now-btn">
            <Link to={`/order`}>Buy Now</Link>
          </button> */}
        </div>

        {isModalOpen && (
          <div className="sellerdet-image-modal" onClick={closeModal}>
            <div className="sellerdet-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="sellerdet-modal-close" onClick={closeModal}><FontAwesomeIcon icon={faTimes} /></button>
              <button className="sellerdet-prev-image" onClick={prevImage}><FontAwesomeIcon icon={faChevronLeft} /></button>
              <img src={`${API_URL}${listing.images[currentImageIndex]}`} alt="Expanded" className="sellerdet-modal-image" />
              <button className="sellerdet-next-image" onClick={nextImage}><FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default SellerListingDetailsPage;