import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import "./../styles/SearchResultsPage.css";
import "./../styles/HeaderGlobal.css";

function SearchResultsPage() {
    const API_URL = import.meta.env.VITE_API_URL;
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get("query");
    
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const token = localStorage.getItem("userToken");
    
                if (!token) {
                    setError("Not authorized. Please log in.");
                    setLoading(false);
                    return;
                }
    
                console.log("Fetching:", `${API_URL}/api/search?query=${searchQuery}`);
    
                const response = await fetch(`${API_URL}/api/search?query=${encodeURIComponent(searchQuery)}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                });
    
                console.log("API Response:", response);
    
                const data = await response.json();
                console.log("API Data:", data);
    
                if (response.ok) {
                    setResults(data);
                } else {
                    setError(data.message || "No results found.");
                }
            } catch (error) {
                console.error("Fetch error:", error);
                setError("An error occurred while fetching search results.");
            } finally {
                setLoading(false);
            }
        };
    
        if (searchQuery) {
            fetchSearchResults();
        }
    }, [searchQuery, API_URL]);
    

    if (loading) return <p>Loading search results...</p>;
    if (error) return <p className="error-message">{error}</p>;

    return (
        <div className="search-results-page main-content-header">
            <h1>Search Results for "{searchQuery}"</h1>

            {results.length === 0 ? (
                <p>No listings found.</p>
            ) : (
                <div className="search-results-grid">
                    {results.map((listing) => (
                        <Link to={`/listing/${listing.id}`} key={listing.id} className="search-listing-card">
                            <img
                                src={listing.coverImage ? `${API_URL}${listing.coverImage}` : "/default-image.png"}
                                alt={listing.title}
                                className="search-listing-img"
                            />
                            <div className="search-listing-details">
                                <h2 className="search-listing-title">{listing.title}</h2>
                                <p className="search-listing-price">${listing.price}</p>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchResultsPage;