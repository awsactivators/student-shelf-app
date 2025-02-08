import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import "./../styles/UserInfoPage.css";
import profileImage from "./../assets/images/avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { faEdit, faStar, faSave, faTimes } from "@fortawesome/free-solid-svg-icons";

const UserInfoPage = () => {
  const [userData] = useState({
    name: "Lucie Bernette",
    email: "lucie.bernette@gmail.com",
    phoneNumber: "123-456-7890",
    schoolCampus: "Humber/North",
    bio: "I am a professional hairstylist. I make and sell all kinds of hair and wigs.",
    policy: "No exchange!",
    rating: 4.2, // Average rating out of 5
    activeListings: 8
  });

  const menuItems = [
    {
      label: "Profile",
      submenu: [
        { label: "User Info", path: "/user-info" },
        { label: "Password", path: "/password" },
        { label: "Listings", path: "/listings" },
        { label: "Settings", submenu: [], path: "/settings" },
        { label: "Notifications", path: "/notifications" },
      ],
    },
  ];

  // Generate star ratings based on user rating
  // const renderStars = (rating) => {
  //   const stars = [];
  //   for (let i = 1; i <= 5; i++) {
  //     stars.push(
  //       <FontAwesomeIcon
  //         key={i}
  //         icon={faStar}
  //         className={i <= Math.round(rating) ? "filled-star" : "empty-star"}
  //       />
  //     );
  //   }
  //   return stars;
  // };
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className="filled-star" />);
      } else if (i === Math.ceil(rating) && rating % 1 !== 0) {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className="half-filled-star" />);
      } else {
        stars.push(<FontAwesomeIcon key={i} icon={faStar} className="empty-star" />);
      }
    }
    return stars;
  };

  return (
    <div className="user-info-page">
      <Sidebar menuItems={menuItems} activeMenu="User Info" />
      <main className="user-info-content container mt-4">
        <div className="row align-items-center row-container">
          <div className="col-md-3 text-center profile-img">
            <img
              src={profileImage}
              alt="User Profile"
              className="img-fluid rounded-circle custom-profile-img"
            />
            <div className="edit-button">
              <button className="edit-profile-btn mt-2">
                <link rel="stylesheet" href="" /><FontAwesomeIcon icon={faEdit} />
              </button>
            </div>
          </div>
          <div className="col-md-9 user-content">
            <h2 className="user-info-title">User Info</h2>
            <p>
              <strong>Name:</strong> {userData.name}
            </p>
            <p>
              <strong>Email:</strong> {userData.email}
            </p>
            <p>
              <strong>Phone Number:</strong> {userData.phoneNumber}
            </p>
            <p>
                <strong>School/Campus:</strong> {userData.schoolCampus}
            </p>
            <p>
              <strong>Bio:</strong> {userData.bio}
            </p>
            <p>
              <strong>Policy:</strong> {userData.policy}
            </p>
            <p>
              <strong>Rating:</strong>{" "}
              <span className="user-rating">{renderStars(userData.rating)}</span>
              <span className="rating-value">({userData.rating}/5)</span>
            </p>
            <p>
              <strong>Active Listings:</strong> {userData.activeListings}
            </p>
            <button className="btn btn-primary">
              <FontAwesomeIcon icon={faEdit} /> Edit
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserInfoPage;
