import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./../styles/SuccessPage.css";
import "./../styles/HeaderGlobal.css";

function SuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const listingTitle = location.state?.listingTitle || "your listing";

  const goToListings = () => {
    navigate("/listings"); 
  };

  const goToAddListing = () => {
    navigate("/add-listing"); 
  };

  return (
    <div className="success-page main-content-header">
      <h1>Listing Added Successfully!</h1>
      <p>Your listing <strong>{listingTitle}</strong> has been added successfully.</p>
      <div className="success-button">
        <button onClick={goToListings} className="btn">Go to Listings</button>
        <button onClick={goToAddListing} className="btn">Add Another Listing</button>
      </div>
    </div>
  );
}

export default SuccessPage;
