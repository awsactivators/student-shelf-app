import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./../styles/SearchPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter, faArrowRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import imageOne from "./../assets/images/image.png";
import imageTwo from "./../assets/images/image-6.png";
import imageThree from "./../assets/images/image-5.png";


function SearchPage() {
  const menuItems = [
    {
      label: "Search",
      // path: "/search",
      submenu: [
        { label: "Listing", path: "/search" },
        { label: "Product/Service", path: "/product-service" }
      ],
    },
  ];


  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({
    category: "",
    subCategory: "",
    campus: "",
  });


  const [listings] = useState([
    { id: 1, title: "Hair Braiding", price: "From $50", image: imageOne, category: "Service", subCategory: "Hair", campus: "North" },
    { id: 2, title: "Handmade Jewellery", price: "From $10", image: imageTwo, category: "Product", subCategory: "Jewellery", campus: "South" },
    { id: 3, title: "Homemade Soap", price: "From $10", image: imageThree, category: "Product", subCategory: "Soap", campus: "North" },
    { id: 4, title: "Handmade Jewellery", price: "From $10", image: imageTwo, category: "Product", subCategory: "Jewellery", campus: "South" },
    { id: 5, title: "Homemade Soap", price: "From $10", image: imageThree, category: "Product", subCategory: "Soap", campus: "North" },
    { id: 6, title: "Homemade Soap", price: "From $10", image: imageThree, category: "Product", subCategory: "Soap", campus: "North" },
    ...Array.from({ length: 20 }, (_, index) => ({
      id: index + 7,
      title: `Item ${index + 4}`,
      price: `$${10 + index}`,
      image: imageOne,
      category: "Product",
      subCategory: "Soap",
      campus: "North",
    })),
  ]);
  

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredListings = listings.filter((listing) => {
    return (
      listing.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedFilters.category === "" || listing.category === selectedFilters.category) &&
      (selectedFilters.subCategory === "" || listing.subCategory === selectedFilters.subCategory) &&
      (selectedFilters.campus === "" || listing.campus === selectedFilters.campus)
    );
  });

  const totalPages = Math.ceil(filteredListings.length / itemsPerPage);

  const handlePageChange = (direction) => {
    setCurrentPage((prevPage) =>
      direction === "next" ? Math.min(prevPage + 1, totalPages) : Math.max(prevPage - 1, 1)
    );
  };

  const toggleFilterModal = () => {
    setIsFilterModalOpen(!isFilterModalOpen);
  };

  const handleFilterChange = (field, value) => {
    setSelectedFilters((prev) => ({ ...prev, [field]: value }));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedListings = filteredListings.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="search-page">
      <Sidebar menuItems={menuItems} activeMenu="Search" />
      <main className="search-content">
        {/* Search Bar */}
        <div className="search-bar">
          <div className="search-box">
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button className="search-cancel">
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
          <button className="filter-btn" onClick={toggleFilterModal}>
            <FontAwesomeIcon icon={faFilter} />
            Filter
          </button>
        </div>

        {/* Filter Modal */}
        {isFilterModalOpen && (
          <div className="filter-modal" onClick={toggleFilterModal}>
            <div className="filter-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="close-filter-modal" onClick={toggleFilterModal}>
                <FontAwesomeIcon icon={faTimes} />
              </button>
              <h2>Filter Options</h2>
              <div className="filter-group">
                <label>Category:</label>
                <select
                  value={selectedFilters.category}
                  onChange={(e) => handleFilterChange("category", e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Product">Product</option>
                  <option value="Service">Service</option>
                </select>
              </div>

              {selectedFilters.category === "Product" && (
                <div className="filter-group">
                  <label>Sub-Category:</label>
                  <select
                    value={selectedFilters.subCategory}
                    onChange={(e) => handleFilterChange("subCategory", e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="Jewellery">Jewellery</option>
                    <option value="Soap">Soap</option>
                  </select>
                </div>
              )}

              {selectedFilters.category === "Service" && (
                <div className="filter-group">
                  <label>Sub-Category:</label>
                  <select
                    value={selectedFilters.subCategory}
                    onChange={(e) => handleFilterChange("subCategory", e.target.value)}
                  >
                    <option value="">All</option>
                    <option value="Hair Braiding">Hair</option>
                  </select>
                </div>
              )}

              <div className="filter-group">
                <label>Campus:</label>
                <select
                  value={selectedFilters.campus}
                  onChange={(e) => handleFilterChange("campus", e.target.value)}
                >
                  <option value="">All</option>
                  <option value="North">North</option>
                  <option value="South">IGS</option>
                  <option value="South">LakeShore</option>
                  <option value="South">Guelph</option>
                </select>
              </div>

              <button className="apply-filter-btn" onClick={toggleFilterModal}>
                Apply Filters
              </button>
            </div>
          </div>
        )}

        {/* Search Results */}
        <div className="listings-grid-container">
          {paginatedListings.length > 0 ? (
            paginatedListings.map((listing) => (
              <div key={listing.id} className="listing-card-container">
                <Link to={`/product-service`}>
                  <img src={listing.image} alt={listing.title} className="listing-image" />
                  <div className="listing-details-container">
                    <p className="listing-title-p">{listing.title}</p>
                    <p className="listing-price-p">{listing.price}</p>
                  </div>
                </Link>
              </div>
            ))
          ) : (
            <p className="no-results">No results found.</p>
          )}
        </div>

        {/* Pagination */}
        <div className="pagination">
          <button
            onClick={() => handlePageChange("prev")}
            disabled={currentPage === 1}
            className="pagination-btn"
          >
            Previous
          </button>
          <span className="pagination-info">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange("next")}
            disabled={currentPage === totalPages}
            className="pagination-btn"
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
}

export default SearchPage;
