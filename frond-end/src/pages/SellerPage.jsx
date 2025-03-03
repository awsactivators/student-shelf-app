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

  return (
    <div className="sellerinfo-seller-page">
      <div className="sellerinfo-seller-header">
        <div>
          <button className="sellerinfo-follow-btn">Follow</button>
        </div>
        <img
          src={seller.profileImage ? `${API_URL}${seller.profileImage}` : defaultLogo}
          alt="Seller Profile"
          className="sellerinfo-seller-profile-img"
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




// import React, { useEffect, useState } from "react";
// import { useParams, Link } from "react-router-dom";
// import "./../styles/SellerPage.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheckCircle, faMessage, faStar } from "@fortawesome/free-solid-svg-icons";

// function SellerPage() {
//   const { sellerId } = useParams(); 
//   const API_URL = import.meta.env.VITE_API_URL;
//   const [seller, setSeller] = useState(null);
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSeller = async () => {
//       if (!sellerId || isNaN(sellerId)) {
//         setError("Invalid seller ID");
//         setLoading(false);
//         return;
//       }

//       try {
//         const token = localStorage.getItem("userToken");

//         if (!token) {
//           setError("Not authorized. Please log in.");
//           setLoading(false);
//           return;
//         }

//         console.log("Fetching seller with ID:", sellerId);

//         // Fetch user details for the seller
//         const response = await fetch(`${API_URL}/api/sellers/${sellerId}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await response.json();
//         console.log("Fetched Seller Data:", data);

//         if (response.ok) {
//           setSeller(data);
//         } else {
//           setError(data.message || "Seller not found");
//         }
//       } catch (error) {
//         setError("An error occurred while fetching seller details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchSeller();
//   }, [sellerId, API_URL]);

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <FontAwesomeIcon
//           key={i}
//           icon={faStar}
//           className={i <= Math.round(rating) ? "sellerinfo-filled-star" : "sellerinfo-empty-star"}
//         />
//       );
//     }
//     return stars;
//   };

//   if (loading) return <p>Loading seller details...</p>;
//   if (error) return <p className="error-message">{error}</p>;
//   if (!seller) return <p>Seller not found</p>;

//   return (
//     <div className="sellerinfo-seller-page">
//       <div className="sellerinfo-seller-header">
//         <div>
//           <button className="sellerinfo-follow-btn">Follow</button>
//         </div>
//         <img
//           src={seller.profilePicture ? `${API_URL}${seller.profilePicture}` : "/default-avatar.png"}
//           alt="Seller Profile"
//           className="sellerinfo-seller-profile-img"
//         />
//         <h1 className="sellerinfo-seller-name">
//           {seller.name}{" "}
//           {seller.isVerified && <FontAwesomeIcon icon={faCheckCircle} className="sellerinfo-verified-icon" />}
//         </h1>
//       </div>

//       <div className="seller-detail-container">
//         <div className="sellerinfo-seller-details">
//           <p><strong>Campus:</strong> {seller.campus || "Not provided"}</p>
//           <p><strong>Member Since:</strong> {seller.memberSince || "Unknown"}</p>
//           <p><strong>Overall Rating:</strong> <span className="sellerinfo-rating-stars">{renderStars(seller.rating || 0)}</span></p>
//           <p><strong>Bio:</strong> {seller.bio || "No bio available"}</p>
//           <p><strong>Policies:</strong> {seller.policy || "No policies listed"}</p>
//         </div>

//         <div className="sellerinfo-active-listings">
//           <h2>Active Listings:</h2>
//           <div className="sellerinfo-listings-grid">
//             {seller.activeListings?.slice(0, 4).map((listing, index) => (
//               <Link to={`/seller/${sellerId}/listing/${listing.id}`} key={index}>
//                 <img
//                   src={`${API_URL}${listing.image}`}
//                   alt={`Active Listing ${index + 1}`}
//                   className="sellerinfo-listing-img"
//                 />
//               </Link>
//             ))}
//           </div>
//           {seller.activeListings?.length > 4 && (
//             <Link to={`/seller/${sellerId}/listings`} className="sellerinfo-view-all-link">
//               View All
//             </Link>
//           )}
//         </div>

//         <div className="sellerinfo-action-buttons">
//           <button className="sellerinfo-message-btn">
//             <Link to={`/message?sellerId=${sellerId}`} className="seller-message-icon-btn">
//               <FontAwesomeIcon icon={faMessage} /> Send a Message
//             </Link>
//           </button>
//           <button className="sellerinfo-leave-review-btn">
//             <Link to={`/leave-review?sellerId=${sellerId}`} className="seller-leave-review-icon-btn">
//               Leave a Review
//             </Link>
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SellerPage;






// import React, { useRef } from "react";
// import { Link } from "react-router-dom";
// import "./../styles/SellerPage.css";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCheckCircle, faMessage, faStar } from "@fortawesome/free-solid-svg-icons";
// import braceletOne from "./../assets/images/bracelet1.png";
// import braceletTwo from "./../assets/images/bracelet2.png";
// import braceletThree from "./../assets/images/bracelet3.png";
// import braceletFour from "./../assets/images/bracelet4.png";
// import sellerProile from "./../assets/images/seller-avatar.png";

// function SellerPage() {
//   const reviewsContainerRef = useRef(null);

//   const sellerData = {
//     name: "James James",
//     profilePicture: sellerProile, 
//     isVerified: true,
//     campus: "North",
//     memberSince: "July 13, 2024",
//     rating: 4,
//     bio: "I make all kinds of jewellery by hand",
//     policies: "Refunds only within 2 days of purchase with item intact",
//     activeListings: [
//       braceletOne,
//       braceletTwo,
//       braceletThree,
//       braceletFour,
//       braceletFour,
//     ],
//     reviews: [
//       { text: "James is a good seller and provides great service!", reviewer: "Sarah M." },
//       { text: "Good quality product and fast delivery.", reviewer: "Michael J." },
//       { text: "Delivers on time and is very professional.", reviewer: "Anna K." },
//       { text: "Very creative jewelries with amazing designs.", reviewer: "John D." },
//       { text: "Excellent customer service and reliable.", reviewer: "Emily R." },
//     ],
//   };

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <FontAwesomeIcon
//           key={i}
//           icon={faStar}
//           className={i <= Math.round(rating) ? "sellerinfo-filled-star" : "sellerinfo-empty-star"}
//         />
//       );
//     }
//     return stars;
//   };

//   const scrollReviews = (direction) => {
//     const container = reviewsContainerRef.current;
//     if (container) {
//       const scrollAmount = direction === "left" ? -300 : 300;
//       container.scrollBy({ left: scrollAmount, behavior: "smooth" });
//     }
//   };


//   return (
//     <div className="sellerinfo-seller-page">
//       {/* Profile Section */}
//       <div className="sellerinfo-seller-header">
//         <div>
//           <button className="sellerinfo-follow-btn">Follow</button>
//         </div>
//         <img
//           src={sellerData.profilePicture}
//           alt="sellerinfo-Seller Profile"
//           className="sellerinfo-seller-profile-img"
//         />
//         <div className="ssellerinfo-seller-info">
//           <h1 className="sellerinfo-seller-name">
//             {sellerData.name}{" "}
//             {sellerData.isVerified && (
//               <FontAwesomeIcon icon={faCheckCircle} className="sellerinfo-verified-icon" />
//             )}
//           </h1>
          
//         </div>
//       </div>

//       <div className="seller-detail-container">
//         {/* Seller Details */}
//         <div className="sellerinfo-seller-details">
//           <p>
//             <strong>Campus:</strong> {sellerData.campus}
//           </p>
//           <p>
//             <strong>Member Since:</strong> {sellerData.memberSince}
//           </p>
//           <p>
//             <strong>Overall Rating:</strong>{" "}
//             <span className="sellerinfo-rating-stars">{renderStars(sellerData.rating)}</span>
//           </p>
//           <p>
//             <strong>Bio:</strong> {sellerData.bio}
//           </p>
//           <p>
//             <strong>Policies:</strong> {sellerData.policies}
//           </p>
//         </div>

//         {/* Active Listings */}
//         <div className="sellerinfo-active-listings">
//           <h2>Active Listings:</h2>
//           <div className="sellerinfo-listings-grid">
//             {sellerData.activeListings.slice(0, 4).map((listing, index) => (
//               <Link to={`/seller-listing-details/${index + 1}`} key={index}>
//                 <img
//                   src={listing}
//                   alt={`Active Listing ${index + 1}`}
//                   className="sellerinfo-listing-img"
//                 />
//               </Link>
//             ))}
//           </div>
//           {sellerData.activeListings.length > 4 && (
//             <a href="/seller-listings" className="sellerinfo-view-all-link">
//               View All
//             </a>
//           )}
//         </div>


//         {/* Reviews Section */}
//         <div className="sellerinfo-reviews-section">
//           <h2>Reviews:</h2>
//           <div className="sellerinfo-reviews-container">
//             <button
//               className="sellerinfo-scroll-btn scroll-left"
//               onClick={() => scrollReviews("left")}
//             >
//               &lt;
//             </button>
//             <div className="sellerinfo-reviews-list" ref={reviewsContainerRef}>
//               {sellerData.reviews.map((review, index) => (
//                 <div key={index} className="sellerinfo-review-item">
//                   <p className="sellerinfo-review-text">{review.text}</p>
//                   <p className="sellerinfo-reviewer-name">- {review.reviewer}</p>
//                 </div>
//               ))}
//             </div>
//             <button
//               className="sellerinfo-scroll-btn scroll-right"
//               onClick={() => scrollReviews("right")}
//             >
//               &gt;
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Send a Message and Leave a Review Buttons */}
//       <div className="sellerinfo-action-buttons">
//         <button className="sellerinfo-message-btn">
//           <Link to={`/message`} className="seller-message-icon-btn">
//             <FontAwesomeIcon icon={faMessage} /> Send a Message
//           </Link>
//         </button>
//         <button className="sellerinfo-leave-review-btn">
//           <Link to={`/leave-review`} className="seller-leave-review-icon-btn">
//             Leave a Review
//           </Link>
//         </button>
//       </div>

//     </div>
//   );
// }

// export default SellerPage;
