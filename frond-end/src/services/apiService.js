// src/service/apiService.js

const backendUrl = "http://localhost:5001"; // Backend URL

export const fetchListings = async () => {
    try {
        const response = await fetch(`${backendUrl}/api/listings`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error fetching listings:", error);
        throw error;
    }
};
