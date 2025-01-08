import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "./../styles/ListingsPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import imageOne from "./../assets/images/image.png";
import imageTwo from "./../assets/images/image-2.png";
import imageThree from "./../assets/images/image-3.png";
import imageFour from "./../assets/images/image-4.png";

function ListingsPage() {
  const listingsPerPage = 12; 
  const [currentPage, setCurrentPage] = useState(1);

  const allListings = [
    { id: 1, title: "Weave Braiding", price: "From $50", status: "Active", category: "Service", image: imageOne },
    { id: 2, title: "Bouncy Wig", price: "$70", status: "Sold", category: "Product", image: imageTwo },
    { id: 3, title: "Pixie Wig", price: "$45", status: "Active", category: "Product", image: imageThree },
    { id: 4, title: "Weave Braiding", price: "From $50", status: "Active", category: "Service", image: imageFour },
    { id: 5, title: "Weave Braiding", price: "From $50", status: "Active", category: "Service", image: imageOne },
    { id: 6, title: "Bouncy Wig", price: "$70", status: "Sold", category: "Product", image: imageTwo },
    { id: 7, title: "Pixie Wig", price: "$45", status: "Active", category: "Product", image: imageThree },
    { id: 8, title: "Weave Braiding", price: "From $50", status: "Active", category: "Service", image: imageFour },
    { id: 9, title: "Weave Braiding", price: "From $50", status: "Active", category: "Service", image: imageOne },
    { id: 10, title: "Bouncy Wig", price: "$70", status: "Sold", category: "Product", image: imageTwo },
    { id: 11, title: "Pixie Wig", price: "$45", status: "Active", category: "Product", image: imageThree },
    { id: 12, title: "Weave Braiding", price: "From $50", status: "Active", category: "Service", image: imageFour },
  ];

  // Calculate total pages
  const totalPages = Math.ceil(allListings.length / listingsPerPage);

  // Get listings for the current page
  const startIndex = (currentPage - 1) * listingsPerPage;
  const endIndex = startIndex + listingsPerPage;
  const currentListings = allListings.slice(startIndex, endIndex);


  // Handle page navigation
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };


  const menuItems = [
    {
      label: "Profile",
      submenu: [
        { label: "User Info", path: "/user-info" },
        { label: "Password", path: "/password" },
        { label: "Listings", path: "/listings" },
        { label: "Settings", submenu: [], path: "/settings" },
        { label: "Notifications", path: "/notifications" },
      ],
    },
  ];


  

  return (
    <div className="listings-page">
      <Sidebar menuItems={menuItems} activeMenu="Listings" />
      <main className="listings-content">
        <h1>My Listings</h1>
        <a href="/add-listing" className="add-listing-link">
          Add a Listing
        </a>
        <div className="listings-grid">
          {currentListings.map((listing) => (
            <div key={listing.id} className="listing-card">
              <img src={listing.image} alt={listing.title} className="listing-img" />
              <div className="listing-details">
                <p className="listing-title">{listing.title}</p>
                <p className="listing-price">{listing.price}</p>
                <span className={`listing-status ${listing.status.toLowerCase()}`}>{listing.status}</span>
                <span className={`listing-category ${listing.category.toLowerCase()}`}>{listing.category}</span>
                <div className="listing-actions">
                  <button className="btn edit-btn">
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button className="btn delete-btn">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <a href="/add-listing" className="add-listing-link">
          Add a Listing
        </a>

        {/* Pagination Controls */}
        <div className="pagination-controls d-flex justify-content-between">
          <button
            className="btn listing-btn-secondary btn-secondary "
            onClick={handlePrevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>Page {currentPage} of {totalPages}</span>
          <button
            className="btn listing-btn-secondary btn-secondary"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}

export default ListingsPage;
