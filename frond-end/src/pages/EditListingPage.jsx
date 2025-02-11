import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AddListingPage from "./AddListingPage"; 


function EditListingPage() {
  const { id } = useParams(); // Get listing ID from the URL
  const [listingData, setListingData] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await fetch(`${API_URL}/api/listings/${id}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          const errorData = await response.text(); // Read error response as text for debugging
          console.error("Error response:", errorData);
          // throw new Error(`Failed to fetch listing: ${response.status}`);
          navigate("/home");
          return;
        } 
    
        const data = await response.json();

        // Ensure images array is parsed correctly
        const parsedImages = Array.isArray(data.images) ? data.images : JSON.parse(data.images || "[]");

        // Ensure cover image is set correctly
        const coverImage = data.coverImage || parsedImages[0] || null;

        setListingData({
          ...data,
          images: parsedImages,
          coverImage, // Make sure cover image is properly set
        });
      } catch (error) {
        console.error("Error fetching listing data:", error);
        console.log("Failed to load listing data.");
        navigate("/home");
      }
    };

    fetchListing();
  }, [id, API_URL, navigate]);

  if (!listingData) {
    return <p>Loading...</p>; // Show a loading indicator until data is fetched
  }

  return (
    <AddListingPage existingData={listingData} isEditing />
  );
}

export default EditListingPage;
