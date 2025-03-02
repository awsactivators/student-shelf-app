import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare, faMessage, faStar, faChevronLeft, faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./../styles/ListingDetailsPage.css";

function ListingDetailsPage() {
  const { id } = useParams();
  const API_URL = import.meta.env.VITE_API_URL;
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const token = localStorage.getItem("userToken");

        if (!token) {
          setError("Not authorized. Please log in.");
          return;
        }

        const response = await fetch(`${API_URL}/api/listings/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          const parsedImages = Array.isArray(data.images) ? data.images : JSON.parse(data.images || "[]");
          setListing({
            ...data,
            images: parsedImages,
            user: data.User || {},
          });
        } else {
          setError(data.message || "Listing not found");
        }
      } catch (error) {
        setError("An error occurred while fetching listing details");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id, API_URL]);

  const openModal = (index) => {
    setCurrentImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % listing.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + listing.images.length) % listing.images.length);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={i <= Math.round(rating) ? "seller-filled-star" : "seller-empty-star"}
        />
      );
    }
    return stars;
  };

  if (loading) return <p>Loading listing details...</p>;
  if (error) return <p className="error-message">{error}</p>;
  if (!listing) return <p>Listing not found</p>;

  return (
    <div className="search-listing-details-page">
      <main className="search-listing-details-content">
        <div className="search-images-section">
          <div className="search-cover-image">
            <img src={`${API_URL}${listing.coverImage}`} alt="Main Listing" onClick={() => openModal(0)} />
          </div>
          <div className="search-thumbnail-images">
            {listing.images.map((image, index) => (
              <img
                key={index}
                src={`${API_URL}${image}`}
                alt={`Thumbnail ${index + 1}`}
                onClick={() => openModal(index)}
              />
            ))}
          </div>
        </div>

        <h1 className="search-listing-title">{`${listing.title} - $${listing.price}`}</h1>

        <p className="search-listing-description">
          <strong>Description:</strong> {listing.description}
        </p>

        <div className="search-seller-info">
          <h2>
            Seller Info <Link to={`/seller`} className="seller-link-icon"> <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> </Link>
          </h2>
          <p><strong>Name:</strong> {listing.user?.name || "Unknown"}</p>
          <p><strong>Campus:</strong> {listing.user?.campus || "Not provided"}</p>
          <p><strong>Rating:</strong> <span className="seller-rating-stars">{renderStars(listing.user?.rating || 0)}</span></p>
          <p><strong>Active Listings:</strong> {listing.user?.activeListings || 0}</p>
        </div>

        <div className="search-action-buttons">
          <button className="search-message-seller-btn">
            <Link to={`/message`} className="search-message-icon-btn"><FontAwesomeIcon icon={faMessage} /> Message Seller</Link>
          </button>
          <button className="search-buy-now-btn"><Link to={`/order`}>Buy Now</Link></button>
        </div>

        {isModalOpen && (
          <div className="search-image-modal" onClick={closeModal}>
            <div className="search-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="search-modal-close" onClick={closeModal}><FontAwesomeIcon icon={faTimes} /></button>
              <button className="search-prev-image" onClick={prevImage}><FontAwesomeIcon icon={faChevronLeft} /></button>
              <img src={`${API_URL}${listing.images[currentImageIndex]}`} alt="Expanded" className="search-modal-image" />
              <button className="search-next-image" onClick={nextImage}><FontAwesomeIcon icon={faChevronRight} /></button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default ListingDetailsPage;




// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";
// // import Sidebar from "../components/Sidebar";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowUpRightFromSquare, faMessage, faStar } from "@fortawesome/free-solid-svg-icons";
// import "./../styles/ListingDetailsPage.css";

// function ListingDetailsPage() {
//   const { id } = useParams();
//   const API_URL = import.meta.env.VITE_API_URL;
//   const [listing, setListing] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [focusedImage, setFocusedImage] = useState(null);

//   useEffect(() => {
//     const fetchListing = async () => {
//       try {
//         const token = localStorage.getItem("userToken");

//         if (!token) {
//           setError("Not authorized. Please log in.");
//           return;
//         }

//         const response = await fetch(`${API_URL}/api/listings/${id}`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         });

//         const data = await response.json();

//         if (response.ok) {
//           // Ensure `images` is an array
//           const parsedImages = Array.isArray(data.images) ? data.images : JSON.parse(data.images || "[]");

//           setListing({
//             ...data,
//             images: parsedImages,
//             user: data.User || {}, // Ensure user object is always available
//           });
//         } else {
//           setError(data.message || "Listing not found");
//         }
//       } catch (error) {
//         setError("An error occurred while fetching listing details");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchListing();
//   }, [id, API_URL]);

//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setFocusedImage(null);
//   };

//   const openFocusedView = (image) => setFocusedImage(image);
//   const closeFocusedView = () => setFocusedImage(null);

//   const renderStars = (rating) => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <FontAwesomeIcon
//           key={i}
//           icon={faStar}
//           className={i <= Math.round(rating) ? "seller-filled-star" : "seller-empty-star"}
//         />
//       );
//     }
//     return stars;
//   };

//   if (loading) return <p>Loading listing details...</p>;
//   if (error) return <p className="error-message">{error}</p>;
//   if (!listing) return <p>Listing not found</p>;

//   // const menuItems = [
//   //   {
//   //     label: "Details",
//   //     submenu: [
//   //       { label: "Listing", path: "/search" },
//   //       { label: "Product/Service", path: "/product-service" },
//   //     ],
//   //   },
//   // ];


//   return (
//     <div className="search-listing-details-page">
//       {/* <Sidebar menuItems={menuItems} activeMenu="Product/Service" /> */}
//       <main className="search-listing-details-content">
//         <div className="search-images-section">
//           <div className="search-cover-image">
//             <img src={listing.coverImage ? `${API_URL}${listing.coverImage}` : ""} alt="Main Listing" onClick={openModal} />
//           </div>
//           <div className="search-thumbnail-images">
//             {listing.images.map((image, index) => (
//               <img
//                 key={index}
//                 src={`${API_URL}${image}`}
//                 alt={`Thumbnail ${index + 1}`}
//                 onClick={openModal}
//               />
//             ))}
//           </div>
//         </div>

//         <h1 className="search-listing-title">{`${listing.title} - $${listing.price}`}</h1>

//         <p className="search-listing-description">
//           <strong>Description:</strong> {listing.description}
//         </p>

//         <div className="search-seller-info">
//           <h2>
//             Seller Info <Link to={`/seller`} className="seller-link-icon"> <FontAwesomeIcon icon={faArrowUpRightFromSquare} /> </Link>
//           </h2>
//           <p><strong>Name:</strong> {listing.user?.name || "Unknown"}</p>
//           <p><strong>Campus:</strong> {listing.user?.campus || "Not provided"}</p>
//           <p><strong>Rating:</strong> <span className="seller-rating-stars">{renderStars(listing.user?.rating || 0)}</span></p>
//           <p><strong>Active Listings:</strong> {listing.user?.activeListings || 0}</p>
//         </div>

//         <div className="search-action-buttons">
//           <button className="search-message-seller-btn">
//             <Link to={`/message`} className="search-message-icon-btn"><FontAwesomeIcon icon={faMessage} /> Message Seller</Link>
//           </button>
//           <button className="search-buy-now-btn"><Link to={`/order`}>Buy Now</Link></button>
//         </div>

//         {isModalOpen && (
//           <div className="search-image-modal" onClick={closeModal}>
//             <div className="search-modal-content" onClick={(e) => e.stopPropagation()}>
//               <div className="search-modal-thumbnails">
//                 {listing.images.map((image, index) => (
//                   <img
//                     key={index}
//                     src={`${API_URL}${image}`}
//                     alt={`Modal Image ${index + 1}`}
//                     onClick={() => openFocusedView(image)}
//                   />
//                 ))}
//               </div>

//               <button className="search-modal-close" onClick={closeModal}>✖</button>

//               {focusedImage && (
//                 <div className="search-focused-view">
//                   <img src={focusedImage} alt="Focused" />
//                   <button className="search-focused-close" onClick={closeFocusedView}>✖</button>
//                 </div>
//               )}
//             </div>
//           </div>
//         )}
//       </main>
//     </div>
//   );
// }

// export default ListingDetailsPage;
