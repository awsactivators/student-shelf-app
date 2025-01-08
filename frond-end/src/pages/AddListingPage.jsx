import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpload } from "@fortawesome/free-solid-svg-icons";
import "./../styles/AddListingPage.css";

function AddListingPage() {
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [customSubcategory, setCustomSubcategory] = useState("");
  const [error, setError] = useState(false);
  const [title, setTitle] = useState("");
  const navigate = useNavigate();

  const subcategories = {
    Product: ["Electronics", "Clothing", "Accessories", "Books", "Other"],
    Service: ["Tutoring", "Repair", "Event Planning", "Other"],
  };
  

  const handleSubmit = (e) => {
    e.preventDefault();
    const listingData = {
      title,
      description,
      category,
      subcategory: subcategory === "Other" ? customSubcategory : subcategory,
      price,
    };
    console.log("Listing Data:", listingData);
    navigate("/success");
  };


  const menuItems = [
    {
      label: "Sell",
      submenu: [
        { label: "Add Listing", path: "/add-listing" }
      ],
    },
  ];

  return (
    <div className="add-listing-page">
      <Sidebar menuItems={menuItems} activeMenu="Add Listing" />
      <main className="add-listing-content">
        <h1 className="add-listing-title">Add a Listing</h1>
        <form className="add-listing-form" onSubmit={handleSubmit}>
          <div className="form-group add-form-group">
            <label htmlFor="title">Title</label>
            <input 
            type="text" 
            id="title" 
            placeholder="Enter title" 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required/>
          </div>

          <div className="form-group add-form-group">
            <label htmlFor="description">Description</label>
            <textarea id="description" placeholder="Enter description"></textarea>
          </div>

          <div className="form-group add-form-group">
            <label>Category</label>
            <div className="radio-group">
              <label>
                <input 
                id="service"
                type="radio" 
                name="category" 
                value="Service" 
                checked={category === "Service"} 
                onChange={(e) => setCategory(e.target.value)} />
                {/* onChange={handleCategoryChange} */}
                Service
              </label>
              <label>
                <input
                  id="product"
                  type="radio"
                  name="category"
                  value="Product"
                  checked={category === "Product"}
                  onChange={(e) => setCategory(e.target.value)}
                />
                Product
              </label>
            </div>
            {error && (
              <span className="error-message">
                Please select a category before submitting.
              </span>
            )}
          </div>

          {/* Subcategory Dropdown */}
          {category && (
            <div className="form-group add-form-group">
              <label>Subcategory:</label>
              <select
                className="form-control"
                value={subcategory}
                onChange={(e) => setSubcategory(e.target.value)}
              >
                <option value="">Select a subcategory</option>
                {subcategories[category].map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>

              {/* Custom Subcategory Input */}
              {subcategory === "Other" && (
                <input
                  type="text"
                  className="form-control mt-2"
                  placeholder="Specify your subcategory"
                  value={customSubcategory}
                  onChange={(e) => setCustomSubcategory(e.target.value)}
                />
              )}
            </div>
          )}

          <div className="form-group add-form-group">
            <label htmlFor="price">Price</label>
            <input type="number" id="price" placeholder="Enter price" required/>
          </div>

          <div className="form-group add-form-group">
            <div className="upload-icon">
              Upload <FontAwesomeIcon icon={faUpload} size="2x" />
            </div>
          </div>

          <button type="submit" className="publish-btn">Publish</button>
        </form>
      </main>
    </div>
  );
}

export default AddListingPage;
