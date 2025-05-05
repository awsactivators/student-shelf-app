import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./../styles/ReviewPage.css";
import "./../styles/HeaderGlobal.css";

function ReviewPage() {
  const { sellerId } = useParams(); 
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const [reviewData, setReviewData] = useState({ comment: "", rating: 0 });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null); 

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const token = localStorage.getItem("userToken");
        if (!token) {
          setError("You must be logged in to submit a review.");
          return;
        }

        const response = await fetch(`${API_URL}/api/users/me`, {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setLoggedInUser(data);
        } else {
          setError("Failed to fetch user details.");
        }
      } catch (error) {
        setError("An error occurred while fetching user details.");
      }
    };

    fetchLoggedInUser();
  }, [API_URL]);

  const handleInputChange = (e) => {
    setReviewData({ ...reviewData, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (rating) => {
    setReviewData({ ...reviewData, rating });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loggedInUser) {
      setError("You must be logged in to submit a review.");
      return;
    }
  
    console.log("Submitting review for sellerId:", sellerId); 
  
    try {
      const response = await fetch(`${API_URL}/api/reviews/${sellerId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({
          rating: reviewData.rating,
          comment: reviewData.comment,
        }),
      });
  
      console.log("API Response Status:", response.status); 
      const data = await response.json();
      console.log("API Response Data:", data); 
  
      if (response.ok) {
        setSuccessMessage("Review submitted successfully!");
        setReviewData({ comment: "", rating: 0 });
        setError(null);
        setTimeout(() => navigate(`/seller/${sellerId}`), 1500); 
      } else {
        setError(data.message || "Failed to submit review.");
      }
    } catch (err) {
      setError("An error occurred while submitting the review.");
    }
  };
  
  

  return (
    <div className="review-page main-content-header">
      <h1>Submit a Review</h1>
      {error && <p className="error-message">{error}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
      <form className="review-form" onSubmit={handleSubmit}>
        <div className="review-form-group">
          <label htmlFor="comment">Message:</label>
          <textarea
            id="comment"
            name="comment"
            value={reviewData.comment}
            onChange={handleInputChange}
            placeholder="Write your review here..."
            required
          />
        </div>

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

        <button type="submit" className="review-btn-submit">
          Submit Review
        </button>
      </form>
    </div>
  );
}

export default ReviewPage;
