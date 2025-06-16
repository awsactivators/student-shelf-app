import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "./../styles/FavoritesPage.css";
import "./../styles/HeaderGlobal.css";
import { Link, useLocation } from "react-router-dom";
import { userMenuItems } from "../constants/menuItems";


function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarToggle = (isOpen) => setIsSidebarOpen(isOpen);
  const location = useLocation();
  
  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const token = localStorage.getItem("userToken");
        const response = await fetch(`${API_URL}/api/favorites`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await response.json();
        if (response.ok) {
          setFavorites(data);
        } else {
          console.error("Error fetching favorites:", data.message);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites();
  }, [API_URL]);

  useEffect(() => {
    if (window.innerWidth <= 576) {
      setIsSidebarOpen(false);
    }
  }, [location]);

  return (
    <div className="favorites-page main-layout-sidebar main-content-header">
      <div className={`sidebar-wrapper ${isSidebarOpen ? "open" : ""}`}>
        <Sidebar menuItems={userMenuItems} activeMenu="Favorites" onToggle={handleSidebarToggle} onLinkClick={() => setIsSidebarOpen(false)} />
      </div>
      {isSidebarOpen && window.innerWidth <= 576 && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      <div className="favorites-main-content">
        <h1>My Favorites</h1>
        {favorites.length > 0 ? (
          <ul className="favorites-list">
            {favorites.filter(fav => fav).map((fav) => (
              <li key={fav.id} className="favorite-item">
                <Link to={`/seller/${fav.id}`} className="favorite-link">
                  <img
                    src={fav.profileImage}
                    alt={fav.name}
                    className="favorite-profile-img"
                  />
                  <span className="favorite-name">{fav.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="no-favorites-message">
            You haven't liked any users yet. Go to a seller's page and click the ❤️ icon to add them to your favorites!
          </p>
        )}
      </div>
    </div>
  );
}

export default FavoritesPage;