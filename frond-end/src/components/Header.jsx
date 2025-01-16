import React, { useState } from "react";
import MobileSidebar from "../components/MobileSidebar";
import "./../styles/Header.css"; 
import logo from "./../assets/images/logo.png"; 
import searchIcon from "./../assets/images/search-icon.png"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell, faBars } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

function Header({ hasNewNotifications = false }) {
    const [searchActive, setSearchActive] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // Handle search box toggle
    const toggleSearch = () => {
        setSearchActive(!searchActive);
    };


    // Toggle Sidebar
    const toggleSidebar = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <div className="custom-header container-fluid d-flex align-items-center justify-content-between px-3 py-2">
                {/* Menu Icon (replacing logo on small screens) */}
                <div className="menu-icon-container">
                    <button className="menu-icon" onClick={toggleSidebar} aria-label="Open Menu">
                        <FontAwesomeIcon icon={faBars} />
                    </button>
                </div>
                
                {/* Logo */}
                <div className="custom-logo d-flex align-items-center">
                    <Link to={"/home"}>
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
                <div className={`search-bell-container ${searchActive ? "expanded" : ""}`}>
                    {/* Notification Bell */}
                    <div className="notification-container">
                    <Link to="/notifications" className="notification-bell">
                        <FontAwesomeIcon icon={faBell} />
                        {hasNewNotifications && <span className="notification-dot"></span>}
                    </Link>
                    </div>

                    {/* Search Box */}
                    <div className={`custom-search-container d-flex align-items-center ${searchActive ? "active" : ""}`}>
                    {!searchActive && (
                        <button
                        className="custom-search-icon"
                        onClick={toggleSearch}
                        aria-label="Open Search"
                        >
                        <img src={searchIcon} alt="Search Icon" />
                        </button>
                    )}
                    {searchActive && (
                        <div className="custom-search-box d-flex align-items-center">
                        <input
                            type="text"
                            className="custom-search-input"
                            placeholder="Search..."
                        />
                        <button
                            className="custom-search-cancel"
                            onClick={toggleSearch}
                            aria-label="Cancel Search"
                        >
                            ✖
                        </button>
                        </div>
                    )}
                    </div>
                </div>

                {/* Mobile Sidebar */}
                <MobileSidebar isOpen={menuOpen} onClose={toggleSidebar} />
            </div>

            {/* Search Bar (Under Header) */}
            <div className="search-bar">
                <input
                    type="text"
                    className="search-input"
                    placeholder="Search..."
                />
            </div>

        </>
    );
}

export default Header;
