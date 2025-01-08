import React, { useState } from "react";
import "./../styles/HomePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import profileImage from "./../assets/images/avatar.png"; 
import imageOne from "./../assets/images/image.png";
import imageTwo from "./../assets/images/image-2.png";
import imageThree from "./../assets/images/image-3.png";
import imageFour from "./../assets/images/image-4.png";
import { Link } from "react-router-dom";

function HomePage() {
  // State to simulate user listings
  const [listings, setListings] = useState([
    { id: 1, title: "Weave Braiding", price: "$50", image: imageOne },
    { id: 2, title: "Bouncy Wig", price: "$70", image: imageTwo },
    { id: 3, title: "Pixie Wig", price: "$45", image: imageThree },
    { id: 4, title: "Box Braiding", price: "From $50", image: imageFour },
    { id: 5, title: "Curly Wig", price: "$65", image: imageOne },
    { id: 6, title: "Straight Wig", price: "$60", image: imageTwo },
    { id: 7, title: "Cornrows", price: "$40", image: imageThree },
    { id: 8, title: "Twist Braids", price: "From $55", image: imageFour },
    { id: 9, title: "Full Lace Wig", price: "$90", image: imageOne },
    { id: 10, title: "Frontal Wig", price: "$75", image: imageTwo },
    { id: 11, title: "Box Twist", price: "$50", image: imageThree },
    { id: 12, title: "Curly Lace", price: "$85", image: imageFour },
  ]);

  // Show only the first 5 listings on the home page
  const visibleListings = listings.slice(0, 5);  

  return (
    <div className="custom-home container">
      {/* Welcome Section */}
      <div className="custom-home-header d-flex justify-content-between align-items-center">
        <h1>
          Welcome <span className="custom-user-name">Lucie</span>!
        </h1>
        <Link to={"/user-info"}>
          <img
            src={profileImage} 
            alt="User Profile"
            className="custom-user-profile-img"
          />
        </Link>
      </div>

      {/* Listings Section */}
      <div className="custom-listings">
        <h2>Listings</h2>
        {listings.length === 0 ? (
          <div className="custom-empty-listing text-center">
            <p>No listings yet.</p>
            <button className="btn add-listing-link-btn">
              <a href="/add-listing" className="add-listing-link">
                Add a Listing
              </a>
            </button>
          </div>
        ) : (
          <div className="custom-listings-grid">
            <div className="custom-filter d-flex align-items-center">
              <span>Filter</span> <Link to={""}><FontAwesomeIcon icon={faFilter} /></Link>
            </div>
            <div className="custom-grid">
              {visibleListings.map((listing) => (
                <div key={listing.id} className="custom-card">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="custom-card-img"
                  />
                  <p className="custom-card-title">{listing.title}</p>
                  <p className="custom-card-price">{listing.price}</p>
                </div>
              ))}
            </div>

            {/* View All Link */}
            {listings.length > 5 ? (
              <a href="/listings" className="custom-view-all active-link">
                View All
              </a>
            ) : (
              <span className="custom-view-all inactive-link">
                View All
              </span>
            )}

            <button className="btn custom-add-listing">
              <a href="/add-listing">
                Add a Listing
              </a>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomePage;

