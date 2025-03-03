import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./../styles/SellerListingsPage.css";

function SellerListingsPage() {
  const { sellerId } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 10;

  useEffect(() => {
    const fetchSellerListings = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          setError("Not authorized. Please log in.");
          setLoading(false);
          return;
        }

        const response = await fetch(`${API_URL}/api/sellers/${sellerId}/listings`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          setListings(data);
        } else {
          setError(data.message || "No listings found.");
        }
      } catch (error) {
        setError("An error occurred while fetching listings.");
      } finally {
        setLoading(false);
      }
    };

    fetchSellerListings();
  }, [sellerId, API_URL]);

  // Calculate pagination
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = listings.slice(indexOfFirstListing, indexOfLastListing);
  const totalPages = Math.ceil(listings.length / listingsPerPage);

  const handleListingClick = (listingId) => {
    navigate(`/seller/${sellerId}/listing/${listingId}`);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleGoBack = () => {
    navigate(`/seller/${sellerId}`);
  };

  if (loading) return <p>Loading listings...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!listings.length) return <p>No listings found for this seller.</p>;

  return (
    <div className="sellerlist-listings-page">
      <div className="sellerlist-header">
        <button className="sellerlist-go-back-btn" onClick={handleGoBack}>
          ← Go Back to Seller Page
        </button>
        <h1>Seller's Listings</h1>
      </div>

      <div className="sellerlist-listings-grid">
        {currentListings.map((listing) => (
          <div
            key={listing.id}
            className="sellerlist-listing-card"
            onClick={() => handleListingClick(listing.id)}
          >
            <Link to={`/seller/${sellerId}/listing/${listing.id}`}>
              <img
                src={listing.coverImage ? `${API_URL}${listing.coverImage}` : "/default-image.png"}
                alt={listing.title}
                className="sellerlist-listing-image"
              />
              <div className="sellerlist-listing-info">
                <h2 className="sellerlist-listing-title">{listing.title}</h2>
                <p className="sellerlist-listing-price">${listing.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {listings.length > listingsPerPage && (
        <div className="sellerlist-pagination">
          <button
            className="sellerlist-pagination-btn"
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span className="sellerlist-pagination-info">{`Page ${currentPage} of ${totalPages}`}</span>
          <button
            className="sellerlist-pagination-btn"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}

export default SellerListingsPage;



// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import "./../styles/SellerListingsPage.css";
// import sampleListingImage from "./../assets/images/bracelet1.png";

// function SellerListingsPage() {
//   const navigate = useNavigate();

//   const seller = {
//     id: 1,
//     name: "James James",
//     listings: Array.from({ length: 20 }, (_, index) => ({
//       id: index + 1,
//       title: `Item ${index + 1}`,
//       price: `$${10 + index}`,
//       image: sampleListingImage,
//     })),
//   };

//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const listingsPerPage = 10;

//   // Calculate pagination
//   const indexOfLastListing = currentPage * listingsPerPage;
//   const indexOfFirstListing = indexOfLastListing - listingsPerPage;
//   const currentListings = seller.listings.slice(
//     indexOfFirstListing,
//     indexOfLastListing
//   );

//   const totalPages = Math.ceil(seller.listings.length / listingsPerPage);

//   const handleListingClick = (listingId) => {
//     navigate(`/seller-listing-details/${listingId}`);
//   };

//   const handleNextPage = () => {
//     if (currentPage < totalPages) setCurrentPage(currentPage + 1);
//   };

//   const handlePrevPage = () => {
//     if (currentPage > 1) setCurrentPage(currentPage - 1);
//   };

//   const handleGoBack = () => {
//     navigate(`/seller`);
//   };

//   return (
//     <div className="sellerlist-listings-page">
//       <div className="sellerlist-header">
//         <button className="sellerlist-go-back-btn" onClick={handleGoBack}>
//           <Link to={`/seller`}>← Go Back to Seller Page</Link>
//         </button>
//         <h1>{`${seller.name}'s Listings`}</h1>
//       </div>
//       {/* <h1>{`${seller.name}'s Listings`}</h1> */}

//       <div className="sellerlist-listings-grid">
//         {currentListings.map((listing) => (
//           <div
//             key={listing.id}
//             className="sellerlist-isting-card"
//             onClick={() => handleListingClick(listing.id)}
//           >
//             <Link to={`/seller-listing-details/:listingId`}>
//               <img
//                 src={listing.image}
//                 alt={listing.title}
//                 className="sellerlist-listing-image"
//               />
//               <div className="sellerlist-listing-info">
//                 <h2 className="sellerlist-listing-title">{listing.title}</h2>
//                 <p className="sellerlist-listing-price">{listing.price}</p>
//               </div>
//             </Link>
//           </div>
//         ))}
//       </div>

//        {/* Pagination */}
//        <div className="sellerlist-pagination">
//         <button
//           className="sellerlist-pagination-btn"
//           onClick={handlePrevPage}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         <span className="sellerlist-pagination-info">{`Page ${currentPage} of ${totalPages}`}</span>
//         <button
//           className="sellerlist-pagination-btn"
//           onClick={handleNextPage}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>
//     </div>
//   );
// }

// export default SellerListingsPage;
