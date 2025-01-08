import React, { useState } from "react";
import "./../styles/ReviewPage.css";

function ReviewPage({ loggedInUser }) {
  // State for review form inputs
  const [reviewData, setReviewData] = useState({
    reviewerName: loggedInUser?.name || "", // Automatically use the logged-in user's name
    category: "",
    message: "",
    rating: 0,
  });

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle rating selection
  const handleRatingChange = (rating) => {
    setReviewData((prev) => ({ ...prev, rating }));
  };

  // Submit review
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Review:", reviewData);

    // Reset form fields
    setReviewData({ reviewerName: loggedInUser.name, category: "", message: "", rating: 0 });

    console.log("Your review has been submitted!");
  };

  return (
    <div className="review-page">
      <h1>Submit a Review</h1>
      <form className="review-form" onSubmit={handleSubmit}>
        {/* Reviewer Name */}
        <div className="review-form-group">
          <label htmlFor="reviewerName">Reviewer Name:</label>
          <input
            type="text"
            id="reviewerName"
            name="reviewerName"
            value={reviewData.reviewerName}
            readOnly 
          />
        </div>

        {/* Category Selection */}
        <div className="review-form-group">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={reviewData.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a category</option>
            <option value="Product">Product</option>
            <option value="Service">Service</option>
          </select>
        </div>

        {/* Message Field */}
        <div className="review-form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            name="message"
            value={reviewData.message}
            onChange={handleInputChange}
            placeholder="Write your review here..."
            required
          />
        </div>

        {/* Star Rating */}
        <div className="review-form-group">
          <label>Rating:</label>
          <div className="review-rating-stars">
            {[1, 2, 3, 4, 5].map((star) => (
              <span
                key={star}
                className={`review-star ${star <= reviewData.rating ? "selected" : ""}`}
                onClick={() => handleRatingChange(star)}
              >
                ★
              </span>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="review-btn-submit">
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default ReviewPage;
