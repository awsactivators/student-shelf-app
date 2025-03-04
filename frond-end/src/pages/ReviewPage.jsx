import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./../styles/ReviewPage.css";

function ReviewPage({ loggedInUser, onReviewSubmit }) {
  const { sellerId } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;
  
  const [reviewData, setReviewData] = useState({
    comment: "",
    rating: 0,
  });
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRatingChange = (rating) => {
    setReviewData((prev) => ({ ...prev, rating }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loggedInUser || !loggedInUser.id) {
      setError("You must be logged in to submit a review.");
      return;
    }
    
    try {
      const response = await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({
          sellerId: parseInt(sellerId, 10),
          buyerId: loggedInUser.id,
          rating: reviewData.rating,
          comment: reviewData.comment,
        }),
      });
      
      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Review submitted successfully!");
        setReviewData({ comment: "", rating: 0 });
        setError(null);
        if (onReviewSubmit) onReviewSubmit(data);
      } else {
        setError(data.message || "Failed to submit review.");
      }
    } catch (err) {
      setError("An error occurred while submitting the review.");
    }
  };

  return (
    <div className="review-page">
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




// import React, { useState } from "react";
// import "./../styles/ReviewPage.css";

// function ReviewPage({ loggedInUser }) {
//   // State for review form inputs
//   const [reviewData, setReviewData] = useState({
//     reviewerName: loggedInUser?.name || "", // Automatically use the logged-in user's name
//     category: "",
//     message: "",
//     rating: 0,
//   });

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setReviewData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle rating selection
//   const handleRatingChange = (rating) => {
//     setReviewData((prev) => ({ ...prev, rating }));
//   };

//   // Submit review
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Submitted Review:", reviewData);

//     // Reset form fields
//     setReviewData({ reviewerName: loggedInUser.name, category: "", message: "", rating: 0 });

//     console.log("Your review has been submitted!");
//   };

//   return (
//     <div className="review-page">
//       <h1>Submit a Review</h1>
//       <form className="review-form" onSubmit={handleSubmit}>
//         {/* Reviewer Name */}
//         <div className="review-form-group">
//           <label htmlFor="reviewerName">Reviewer Name:</label>
//           <input
//             type="text"
//             id="reviewerName"
//             name="reviewerName"
//             value={reviewData.reviewerName}
//             readOnly 
//           />
//         </div>

//         {/* Category Selection */}
//         <div className="review-form-group">
//           <label htmlFor="category">Category:</label>
//           <select
//             id="category"
//             name="category"
//             value={reviewData.category}
//             onChange={handleInputChange}
//             required
//           >
//             <option value="">Select a category</option>
//             <option value="Product">Product</option>
//             <option value="Service">Service</option>
//           </select>
//         </div>

//         {/* Message Field */}
//         <div className="review-form-group">
//           <label htmlFor="message">Message:</label>
//           <textarea
//             id="message"
//             name="message"
//             value={reviewData.message}
//             onChange={handleInputChange}
//             placeholder="Write your review here..."
//             required
//           />
//         </div>

//         {/* Star Rating */}
//         <div className="review-form-group">
//           <label>Rating:</label>
//           <div className="review-rating-stars">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <span
//                 key={star}
//                 className={`review-star ${star <= reviewData.rating ? "selected" : ""}`}
//                 onClick={() => handleRatingChange(star)}
//               >
//                 ★
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="review-btn-submit">
//           Submit Review
//         </button>
//       </form>
//     </div>
//   );
// }

// export default ReviewPage;





// next we will work on the review form, I want when a user enters a review for a seller it appears on the seller page and then add to the ratings too. I already have a sample jsx form but I will provide my review table columns so that you can adjust the form to fit the required inputs.

// review columns
// id	int(11) Auto Increment	
// sellerId	int(11)	
// buyerId	int(11)	
// rating	int(11)	
// comment	text NULL	
// createdAt	datetime	
// updatedAt	datetime


// jsx
// import React, { useState } from "react";
// import "./../styles/ReviewPage.css";

// function ReviewPage({ loggedInUser }) {
//   // State for review form inputs
//   const [reviewData, setReviewData] = useState({
//     reviewerName: loggedInUser?.name || "", // Automatically use the logged-in user's name
//     category: "",
//     message: "",
//     rating: 0,
//   });

//   // Handle input changes
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setReviewData((prev) => ({ ...prev, [name]: value }));
//   };

//   // Handle rating selection
//   const handleRatingChange = (rating) => {
//     setReviewData((prev) => ({ ...prev, rating }));
//   };

//   // Submit review
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Submitted Review:", reviewData);

//     // Reset form fields
//     setReviewData({ reviewerName: loggedInUser.name, category: "", message: "", rating: 0 });

//     console.log("Your review has been submitted!");
//   };

//   return (
//     <div className="review-page">
//       <h1>Submit a Review</h1>
//       <form className="review-form" onSubmit={handleSubmit}>
//         {/* Reviewer Name */}
//         <div className="review-form-group">
//           <label htmlFor="reviewerName">Reviewer Name:</label>
//           <input
//             type="text"
//             id="reviewerName"
//             name="reviewerName"
//             value={reviewData.reviewerName}
//             readOnly 
//           />
//         </div>

//         {/* Category Selection */}
//         <div className="review-form-group">
//           <label htmlFor="category">Category:</label>
//           <select
//             id="category"
//             name="category"
//             value={reviewData.category}
//             onChange={handleInputChange}
//             required
//           >
//             <option value="">Select a category</option>
//             <option value="Product">Product</option>
//             <option value="Service">Service</option>
//           </select>
//         </div>

//         {/* Message Field */}
//         <div className="review-form-group">
//           <label htmlFor="message">Message:</label>
//           <textarea
//             id="message"
//             name="message"
//             value={reviewData.message}
//             onChange={handleInputChange}
//             placeholder="Write your review here..."
//             required
//           />
//         </div>

//         {/* Star Rating */}
//         <div className="review-form-group">
//           <label>Rating:</label>
//           <div className="review-rating-stars">
//             {[1, 2, 3, 4, 5].map((star) => (
//               <span
//                 key={star}
//                 className={`review-star ${star <= reviewData.rating ? "selected" : ""}`}
//                 onClick={() => handleRatingChange(star)}
//               >
//                 ★
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Submit Button */}
//         <button type="submit" className="review-btn-submit">
//           Submit Review
//         </button>
//       </form>
//     </div>
//   );
// }

// export default ReviewPage;


// css
// .review-page {
//   max-width: 600px;
//   margin: 40px auto;
//   padding: 20px;
//   background: #f9f9f9;
//   border-radius: 10px;
//   box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
// }

// .review-page h1 {
//   font-size: 2em;
//   text-align: center;
//   margin-bottom: 20px;
// }

// .review-form {
//   display: flex;
//   flex-direction: column;
//   gap: 15px;
// }

// .review-form-group {
//   display: flex;
//   flex-direction: column;
// }

// .review-form-group label {
//   font-weight: bold;
//   margin-bottom: 5px;
// }

// .review-form-group input,
// .review-form-group select,
// .review-form-group textarea {
//   padding: 10px;
//   border: 2px solid #ccc;
//   border-radius: 5px;
//   font-size: 1em;
// }

// .review-form-group textarea {
//   resize: vertical;
// }

// .review-rating-stars {
//   display: flex;
//   gap: 5px;
//   font-size: 1.5em;
//   cursor: pointer;
// }

// .review-rating-stars .review-star {
//   color: #ccc;
//   transition: color 0.3s;
// }

// .review-rating-stars .review-star.selected {
//   color: gold;
// }

// .review-btn-submit {
//   padding: 10px 20px;
//   background: var(--color-blue);
//   color: white;
//   border: none;
//   border-radius: 5px;
//   cursor: pointer;
// }

// .review-btn-submit:hover {
//   background: #186bbe;
// }

// /* Media Queries for Responsiveness */
// @media (max-width: 768px) {
//   .review-page {
//     padding: 15px;
//     margin: 20px auto;
//     width: 90%; /* Adjust width for smaller screens */
//   }

//   .review-page h1 {
//     font-size: 1.8em; /* Slightly smaller heading */
//   }

//   .review-form {
//     gap: 10px; /* Reduce spacing between form elements */
//   }

//   .review-rating-stars {
//     font-size: 1.2em; /* Smaller stars for smaller screens */
//   }

//   .review-btn-submit {
//     font-size: 0.9em; /* Adjust button size */
//     padding: 8px 15px;
//   }
// }