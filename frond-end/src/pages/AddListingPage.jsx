import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./../styles/AddListingPage.css";
import { userMenuItems } from "../constants/menuItems";

function AddListingPage({ existingData = null, isEditing = false }) {
  const API_URL = import.meta.env.VITE_API_URL;
  console.log("API_URL:", API_URL);

  const [existingImages, setExistingImages] = useState([]);
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [customSubcategory, setCustomSubcategory] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [images, setImages] = useState([]); // Stores uploaded images
  const [coverImage, setCoverImage] = useState(null); // Cover image selection
  const [error, setError] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarToggle = (isOpen) => setIsSidebarOpen(isOpen);

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
      "Hair",
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
    if (files.length + images.length + existingImages.length > 3) {
      setError("You can only upload up to 3 images.");
      return;
    }

    setImages((prev) => [...prev, ...files]); // Append new images
    if (!coverImage) {
      setCoverImage(files[0]); // Default to first image if no cover selected
    }
  };


  // Handle Image Removal
  const handleRemoveImage = (index, isExisting) => {
    if (isExisting) {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    } else {
      setImages((prev) => prev.filter((_, i) => i !== index));
    }
  
    // Reset cover image if the removed image was the cover
    const removedImage = isExisting ? existingImages[index] : images[index];
    if (coverImage === removedImage) {
      setCoverImage(null);
    }
  };
  

  // Handle Cover Image Selection
  const handleCoverImageSelect = (index, isExisting) => {
    const selectedImage = isExisting ? existingImages[index] : images[index];
    setCoverImage(selectedImage);
  };
  

  // Populate fields with existing data when editing
  useEffect(() => {
    if (isEditing && existingData) {
      console.log("Loaded existing images:", existingData.images);
      console.log("Loaded new images:", images);
      console.log("Loaded cover image:", existingData.coverImage);
      console.log("Rendering unique images:", [...new Set(existingImages)]);
      console.log("Cover image:", coverImage);


      setTitle(existingData.title || "");
      setDescription(existingData.description || "");
      setCategory(existingData.category || "");
      setSubcategory(existingData.subcategory || "");
      setPrice(existingData.price || "");

      // Parse existing images correctly
      const parsedImages = Array.isArray(existingData.images)
        ? existingData.images
        : JSON.parse(existingData.images || "[]");

      console.log("Parsed existing images:", parsedImages);

      setExistingImages(parsedImages);

      setCoverImage(existingData.coverImage || parsedImages[0] || null);
    }
  }, [isEditing, existingData]);  


  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!title || !description || !category || !price || (!isEditing && images.length === 0)) {
      setError("All fields except subcategory are required.");
      return;
    }
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("subcategory", subcategory === "Other" ? customSubcategory : subcategory);
    formData.append("price", price);
  
    // Add new images to FormData
    images.forEach((image) => {
      formData.append("images", image);
    });
  
    // Add existing image paths when editing
    if (isEditing) {
      formData.append("existingImages", JSON.stringify(existingImages));
    }

    // Add selected cover image
    // formData.append("coverImage", coverImage);
    if (coverImage) {
      if (typeof coverImage === "string") {
        formData.append("coverImage", coverImage);  // If it's an existing URL
      } else {
        formData.append("coverImage", coverImage);  // If it's a newly uploaded file
      }
    }
    
  
    try {
      const token = localStorage.getItem("userToken");
      const url = isEditing
        ? `${API_URL}/api/listings/${existingData.id}` // Update listing
        : `${API_URL}/api/listings`; // Create new listing
      const method = isEditing ? "PUT" : "POST";
  
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
  
      const data = await response.json();
      if (response.ok) {
        if (isEditing) {
          console.log("Listing updated:", data);
          navigate("/home");
        } else {
          console.log("Listing created:", data);
          navigate("/success", { state: { listingTitle: title } });
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error creating listing:", error);
      setError("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="add-listing-page main-layout-sidebar">
      <Sidebar menuItems={userMenuItems} activeMenu="Add Listing" onToggle={handleSidebarToggle} />
      {isSidebarOpen && window.innerWidth <= 576 && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <main className="add-listing-content">
      <h1>{isEditing ? "Edit Listing" : "Add a Listing"}</h1>
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
            <label htmlFor="images">Upload Images (Max 3)</label>
            <input
              type="file"
              name="images"
              id="images"
              accept="image/*"
              multiple
              onChange={handleImageUpload}
              disabled={images.length + existingImages.length >= 3}
            />

          <div className="image-preview">
            {/* Preview Existing Images */}
            {Array.isArray(existingImages) &&
              existingImages.map((image, index) => (
                <div key={index} className="image-container">
                  <img
                    src={`${API_URL}${image}`}
                    alt={`Listing Image ${index + 1}`}
                    className="uploaded-image"
                  />
                  <button
                    type="button"
                    className="remove-btn"
                    onClick={() => handleRemoveImage(index, true)}
                  >
                    Remove
                  </button>
                  <button
                    type="button"
                    className={`cover-btn ${coverImage === image ? "selected" : ""}`}
                    onClick={() => handleCoverImageSelect(index, true)}
                  >
                    {coverImage === image ? "Cover Image ✅" : "Set as Cover"}
                  </button>
                </div>
              ))}

            {/* Preview New Images */}
            {images.map((image, index) => (
              <div key={index} className="image-container">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Listing Image ${index + 1}`}
                  className="uploaded-image"
                />
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => handleRemoveImage(index, false)}
                >
                  Remove
                </button>
                <button
                  type="button"
                  className={`cover-btn ${coverImage === image ? "selected" : ""}`}
                  onClick={() => handleCoverImageSelect(index, false)}
                >
                  {coverImage === image ? "Cover Image ✅" : "Set as Cover"}
                </button>
              </div>
            ))}
            </div>

          </div>



          {/* Submit Button */}
          <button type="submit" className="publish-btn">Publish</button>
          <button type="button" className="listing-cancel-btn" onClick={() => navigate("/home")}>
            Cancel
          </button>
        </form>
      </main>
    </div>
  );
}

export default AddListingPage;
