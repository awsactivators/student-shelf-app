import React, { useState, useEffect } from "react";
import MobileSidebar from "../components/MobileSidebar";
import { useNavigate } from "react-router-dom";
import "./../styles/Header.css"; 
import logo from "./../assets/images/sslogo.png"; 
import searchIcon from "./../assets/images/search-icon.png"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Header() {
    const [searchTerm, setSearchTerm] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchUnreadCount = async () => {
          const token = localStorage.getItem("userToken");
          const res = await fetch(`${API_URL}/api/notifications/unread-count`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const data = await res.json();
          setUnreadCount(data.count);
        };
      
        fetchUnreadCount();
    }, [API_URL]);

    useEffect(() => {
        const handleStorageChange = () => {
          const storedCount = localStorage.getItem("unreadCount");
          if (storedCount !== null) {
            setUnreadCount(parseInt(storedCount));
          }
        };
      
        window.addEventListener("storage", handleStorageChange);
        handleStorageChange(); 
      
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);


    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    // Handle search submit
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
        }
    };

    // Toggle Sidebar
    const toggleSidebar = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <div className="custom-header container-fluid d-flex align-items-center justify-content-between px-3 py-2">
                {/* Menu Icon */}
                <div className="menu-icon-container">
                    <button className="menu-icon" onClick={toggleSidebar} aria-label="Open Menu">
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </div>
                
                {/* Logo */}
                <div className="custom-logo d-flex align-items-center">
                    <Link to={"/home"} className="logo-link">
                        <img src={logo} alt="Student Shelf Logo" className="custom-logo-img" />
                    </Link>
                </div>

                {/* Navigation Links */}
                <div className="menu-container">
                    <nav className={`custom-nav d-flex align-items-center ss-nav-link ${menuOpen ? "open" : ""}`}>
                        <Link to="/home" className="custom-nav-link">Home</Link>
                        <Link to="/user-info" className="custom-nav-link">Profile</Link>
                        <Link to="/add-listing" className="custom-nav-link">Sell</Link>
                        <Link to="/message" className="custom-nav-link">Messages</Link>
                    </nav>
                </div>

                {/* Bell and Search Container */}
                <div className="search-bell-container">
                    {/* Notification Bell */}
                    <div className="notification-container">
                        <Link to="/notifications" className="notification-bell">
                            <FontAwesomeIcon icon={faBell} />
                            {unreadCount > 0 && (
                                <span className="notification-dot">{unreadCount > 9 ? "9+" : unreadCount}</span>
                            )}
                        </Link>
                    </div>

                    {/* Search Box (For Large Screens) */}
                    <div className="custom-search-container d-none d-md-flex align-items-center">
                        <form onSubmit={handleSearchSubmit} className="custom-search-box d-flex align-items-center">
                            <input
                                type="text"
                                className="custom-search-input"
                                placeholder="Search..."
                                value={searchTerm}
                                onChange={handleSearchChange}
                            />
                            <button type="submit" className="custom-search-submit">
                                <img src={searchIcon} alt="Search" />
                            </button>
                        </form>
                    </div>
                </div>

                {/* Mobile Sidebar */}
                <MobileSidebar isOpen={menuOpen} onClose={toggleSidebar} />
            </div>

            {/* Search Bar for Small Screens (Always Below Header) */}
            <div className="search-bar d-md-none">
                <form onSubmit={handleSearchSubmit} className="d-flex align-items-center">
                    <input
                        type="text"
                        className="search-input"
                        placeholder="Search..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                    <button type="submit" className="custom-search-submit">
                        <img src={searchIcon} alt="Search" />
                    </button>
                </form>
            </div>
        </>
    );
}

export default Header;
