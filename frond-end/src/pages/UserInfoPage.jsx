import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "./../styles/UserInfoPage.css";
import profileImagePlaceholder from "./../assets/images/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faStar, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";

const UserInfoPage = () => {
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedUserData, setUpdatedUserData] = useState({});
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("userToken"); 
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/api/users/me`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        console.log("Response status:", response.status);

        const data = await response.json();
        if (response.ok) {
          setUserData(data);
          setUpdatedUserData(data);
        } else {
          console.error("Error fetching user data:", data.message);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, [navigate, API_URL]);


  // Side Bar
  const menuItems = [
    {
      label: "Profile",
      submenu: [
        { label: "User Info", path: "/user-info" },
        { label: "Password", path: "/password" },
        { label: "Listings", path: "/listings" },
        { label: "Settings", submenu: [], path: "/settings" },
        { label: "Notifications", path: "/notifications", hasNew: true },
        { label: "Support", path: "/support/faqs" },
        { label: "Terms Policy", path: "/agreement/terms" }
      ],
    },
  ];

  // Handle input changes when editing profile
  const handleInputChange = (e) => {
    setUpdatedUserData({
      ...updatedUserData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle profile update
  const handleSaveChanges = async () => {
    try {
      const token = localStorage.getItem("userToken");

      const response = await fetch(`${API_URL}/api/users/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedUserData),
      });

      const data = await response.json();
      if (response.ok) {
        setUserData(updatedUserData);
        setEditMode(false);
      } else {
        console.error("Error updating profile:", data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Handle profile image upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("profileImage", file);

    try {
      const token = localStorage.getItem("userToken");
      const response = await fetch(`${API_URL}/api/users/upload-profile-image`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (response.ok) {
        setUserData((prevData) => ({ ...prevData, profileImage: data.imageUrl }));
      } else {
        console.error("Error uploading profile image:", data.message);
      }
    } catch (error) {
      console.error("Error uploading profile image:", error);
    }
  };

  // Render star ratings based on user rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          className={i <= rating ? "filled-star" : "empty-star"}
        />
      );
    }
    return stars;
  };


  return (
    <div className="user-info-page">
      <Sidebar menuItems={menuItems} activeMenu="User Info" userData={userData} />
      <main className="user-info-content container mt-4">
        {userData ? (
          <div className="row align-items-center row-container">
            <div className="col-md-3 text-center profile-img">
              <img
                src={userData.profileImage || profileImagePlaceholder}
                alt="User Profile"
                className="img-fluid rounded-circle custom-profile-img"
              />
              <div className="edit-button">
                <input type="file" accept="image/*" onChange={handleImageUpload} hidden id="profileImageInput" />
                <label htmlFor="profileImageInput" className="edit-profile-btn mt-2">
                  <FontAwesomeIcon icon={faEdit} />
                </label>
              </div>
            </div>

            <div className="col-md-9 user-content">
              <h2 className="user-info-title">User Info</h2>
              <p>
                <strong>Name:</strong> {editMode ? (
                  <input type="text" name="name" value={updatedUserData.name || ""} onChange={handleInputChange} />
                ) : (
                  userData.name
                )}
              </p>
              <p>
                <strong>Email:</strong>  
                <input 
                  type="email"
                  value={userData.email} 
                  readOnly 
                  className="form-control-plaintext" 
                />
              </p>
              <p>
                <strong>Campus:</strong> {editMode ? (
                  <input type="text" name="campus" value={updatedUserData.campus || ""} onChange={handleInputChange} />
                ) : (
                  userData.campus
                )}
              </p>
              <p>
                <strong>Bio:</strong> {editMode ? (
                  <input type="text" name="bio" value={updatedUserData.bio || ""} onChange={handleInputChange} />
                ) : (
                  userData.bio || "No bio yet"
                )}
              </p>
              <p>
                <strong>Policy:</strong> {editMode ? (
                  <input type="text" name="policy" value={updatedUserData.policy || ""} onChange={handleInputChange} />
                ) : (
                  userData.policy || "No policy yet"
                )}
              </p>
              <p>
                <strong>Phone Number:</strong> {editMode ? (
                  <input type="text" name="phoneNumber" value={updatedUserData.phoneNumber || ""} onChange={handleInputChange} />
                ) : (
                  userData.phoneNumber || "No phone number yet"
                )}
              </p>
              <p>
                <strong>Rating:</strong> <span className="user-rating">{renderStars(userData.rating)}</span>
                <span className="rating-value">({userData.rating}/5)</span>
              </p>
              <p>
                <strong>Active Listings:</strong> {userData.activeListings}
              </p>

              {editMode ? (
                <div>
                  <button className="btn btn-success" onClick={handleSaveChanges}>
                    <FontAwesomeIcon icon={faSave} /> Save
                  </button>
                  <button className="btn btn-danger ms-2" onClick={() => setEditMode(false)}>
                    <FontAwesomeIcon icon={faTimes} /> Cancel
                  </button>
                </div>
              ) : (
                <button className="btn btn-primary" onClick={() => setEditMode(true)}>
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
              )}
            </div>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </div>
  );
};

export default UserInfoPage;
