import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import "./../styles/FavoritesPage.css";
import { Link } from "react-router-dom";
import { userMenuItems } from "../constants/menuItems";

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const handleSidebarToggle = (isOpen) => setIsSidebarOpen(isOpen);
  
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

  return (
    <div className="favorites-page main-layout-sidebar">
      <Sidebar menuItems={userMenuItems} activeMenu="Favorites" onToggle={handleSidebarToggle}  />
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