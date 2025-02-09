import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./../styles/AddListingPage.css";

function AddListingPage() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [customSubcategory, setCustomSubcategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]); // Stores uploaded images
  const [coverImage, setCoverImage] = useState(null); // Cover image selection
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const subcategories = {
    Product: [
      "Electronics",
      "Clothing",
      "Shoes",
      "Accessories",
      "Home & Furniture",
      "Books",
      "Beauty & Personal Care",
      "Toys & Games",
      "Sports Equipment",
      "Other"
    ],
    Service: [
      "Tutoring",
      "Tech Support",
      "Repair Services",
      "Event Planning",
      "Hair & Beauty",
      "Fitness & Wellness",
      "Cleaning Services",
      "Photography",
      "Other"
    ],
  };

  // Handle Image Upload (Max 3 images)
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length > 3) {
      setError("You can only upload up to 3 images.");
      return;
    }
    setImages((prev) => [...prev, ...files]); // Append new images
    if (!coverImage) {
      setCoverImage(files[0]); // Default to first image if no cover selected
    }
  };

  // Handle Image Removal
  const handleRemoveImage = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
    if (coverImage === images[index]) {
      setCoverImage(updatedImages[0] || null); // Reset cover image if removed
    }
  };

  // Handle Cover Image Selection
  const handleCoverImageSelect = (index) => {
    setCoverImage(images[index]);
  };


  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !description || !category || !price || images.length === 0) {
      setError("All fields except subcategory are required.");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("subcategory", subcategory === "Other" ? customSubcategory : subcategory);
    formData.append("price", price);
  
    images.forEach((image) => {
      formData.append("images", image);
    });
  
    formData.append("coverImage", coverImage);
  
    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch(`${API_URL}/api/listings`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
  
      const data = await response.json();
      if (response.ok) {
        navigate("/success");
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error creating listing:", error);
      setError("Something went wrong. Please try again.");
    }
  };
  

  const menuItems = [
    { label: "Sell", submenu: [{ label: "Add Listing", path: "/add-listing" }] },
  ];

  return (
    <div className="add-listing-page">
      <Sidebar menuItems={menuItems} activeMenu="Add Listing" />
      <main className="add-listing-content">
        <h1 className="add-listing-title">Add a Listing</h1>
        <form className="add-listing-form" onSubmit={handleSubmit}>
          {error && <p className="error-message">{error}</p>}

          {/* Title Input */}
          <div className="form-group add-form-group">
            <label htmlFor="title">Title</label>
            <input 
              type="text" 
              id="title" 
              placeholder="Enter title" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="form-group add-form-group">
            <label htmlFor="description">Description</label>
            <textarea 
              id="description" 
              placeholder="Enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Category Selection */}
          <div className="form-group add-form-group">
            <label>Category</label>
            <div className="radio-group">
              <label>
                <input 
                  type="radio" 
                  name="category" 
                  value="Service" 
                  checked={category === "Service"} 
                  onChange={(e) => setCategory(e.target.value)} 
                />
                Service
              </label>
              <label>
                <input
                  type="radio"
                  name="category"
                  value="Product"
                  checked={category === "Product"}
                  onChange={(e) => setCategory(e.target.value)}
                />
                Product
              </label>
            </div>
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

          {/* Price */}
          <div className="form-group add-form-group">
            <label htmlFor="price">Price</label>
            <input 
              type="number" 
              id="price" 
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>

          {/* Image Upload Section */}
          <div className="form-group add-form-group">
            <label>Upload Images (Max 3)</label>
            <input type="file" accept="image/*" multiple onChange={handleImageUpload} />
            <div className="image-preview">
              {images.map((image, index) => (
                <div key={index} className="image-container">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Listing Image ${index + 1}`}
                    className="uploaded-image"
                  />
                  <button type="button" className="remove-btn" onClick={() => handleRemoveImage(index)}>
                    Remove
                  </button>
                  <button
                    type="button"
                    className={`cover-btn ${coverImage === image ? "selected" : ""}`}
                    onClick={() => handleCoverImageSelect(index)}
                  >
                    {coverImage === image ? "Cover Image ✅" : "Set as Cover"}
                  </button>
                </div>
              ))}
            </div>
          </div>


          {/* Submit Button */}
          <button type="submit" className="publish-btn">Publish</button>
        </form>
      </main>
    </div>
  );
}

export default AddListingPage;
