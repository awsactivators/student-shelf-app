import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./../styles/SellerListingsPage.css";
import sampleListingImage from "./../assets/images/bracelet1.png";

function SellerListingsPage() {
  const navigate = useNavigate();

  const seller = {
    id: 1,
    name: "James James",
    listings: Array.from({ length: 20 }, (_, index) => ({
      id: index + 1,
      title: `Item ${index + 1}`,
      price: `$${10 + index}`,
      image: sampleListingImage,
    })),
  };

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const listingsPerPage = 10;

  // Calculate pagination
  const indexOfLastListing = currentPage * listingsPerPage;
  const indexOfFirstListing = indexOfLastListing - listingsPerPage;
  const currentListings = seller.listings.slice(
    indexOfFirstListing,
    indexOfLastListing
  );

  const totalPages = Math.ceil(seller.listings.length / listingsPerPage);

  const handleListingClick = (listingId) => {
    navigate(`/seller-listing-details/${listingId}`);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleGoBack = () => {
    navigate(`/seller`);
  };

  return (
    <div className="sellerlist-listings-page">
      <div className="sellerlist-header">
        <button className="sellerlist-go-back-btn" onClick={handleGoBack}>
          <Link to={`/seller`}>← Go Back to Seller Page</Link>
        </button>
        <h1>{`${seller.name}'s Listings`}</h1>
      </div>
      {/* <h1>{`${seller.name}'s Listings`}</h1> */}

      <div className="sellerlist-listings-grid">
        {currentListings.map((listing) => (
          <div
            key={listing.id}
            className="sellerlist-isting-card"
            onClick={() => handleListingClick(listing.id)}
          >
            <Link to={`/seller-listing-details/:listingId`}>
              <img
                src={listing.image}
                alt={listing.title}
                className="sellerlist-listing-image"
              />
              <div className="sellerlist-listing-info">
                <h2 className="sellerlist-listing-title">{listing.title}</h2>
                <p className="sellerlist-listing-price">{listing.price}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>

       {/* Pagination */}
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
    </div>
  );
}

export default SellerListingsPage;
