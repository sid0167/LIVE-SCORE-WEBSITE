const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

// ✅ API Route for Live Scores
app.get("/api/scores", async (req, res) => {
    try {
        console.log("Fetching live scores...");
        const options = {
            method: "GET",
            url: "https://sportapi7.p.rapidapi.com/api/v1/event/13232336/tennis-power",
            headers: {
                "x-rapidapi-key": process.env.RAPIDAPI_KEY,
                "x-rapidapi-host": "sportapi7.p.rapidapi.com",
            },
            timeout: 20000, // 20 seconds timeout
        };

        const response = await axios.request(options);
        console.log("Scores received:", response.data);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching scores:", error.response ? error.response.data : error.message);
        res.status(error.response?.status || 500).json({ error: "Failed to fetch live scores" });
    }
});

// ✅ API Route for Player Details
app.get("/api/player/:playerId", async (req, res) => {
    const { playerId } = req.params;

    try {
        console.log(`Fetching details for player ID: ${playerId}`);
        const options = {
            method: "GET",
            url: `https://sportapi7.p.rapidapi.com/api/v1/player/${playerId}`,
            headers: {
                "x-rapidapi-key": process.env.RAPIDAPI_KEY,
                "x-rapidapi-host": "sportapi7.p.rapidapi.com",
            },
        };

        const response = await axios.request(options);
        console.log(`Player details received:`, response.data);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching player details:", error.response ? error.response.data : error.message);
        res.status(error.response?.status || 500).json({ error: "Failed to fetch player details" });
    }
});

// ✅ API Route for Fetching Top Winners
app.get("/api/top-winners/:eventId", async (req, res) => {
    const { eventId } = req.params; // Get event ID from request

    if (!eventId) {
        return res.status(400).json({ error: "Event ID is required." });
    }

    try {
        console.log(`Fetching top winners for Event ID: ${eventId}`);
        
        const options = {
            method: "GET",
            url: `https://sportapi7.p.rapidapi.com/api/v1/odds/${eventId}/winning/all`, // 🔹 Use actual event ID
            headers: {
                "x-rapidapi-key": process.env.RAPIDAPI_KEY,
                "x-rapidapi-host": "sportapi7.p.rapidapi.com",
            },
            timeout: 20000, // 20 seconds timeout
        };

        const response = await axios.request(options);
        console.log("Top winners received:", response.data);

        if (!response.data || !response.data.winningOddsMap) {
            return res.status(404).json({ error: "No winning odds found for this event." });
        }

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching top winners:", error.response ? error.response.data : error.message);
        res.status(error.response?.status || 500).json({ error: "Failed to fetch top winners" });
    }
});

// ✅ API Route for Transfers
app.get("/api/transfer", async (req, res) => {
    try {
        console.log("Fetching transfer data...");

        const options = {
            method: "GET",
            url: "https://sportapi7.p.rapidapi.com/api/v1/transfer", // Replace with actual API endpoint
            headers: {
                "x-rapidapi-key": process.env.RAPIDAPI_KEY,
                "x-rapidapi-host": "sportapi7.p.rapidapi.com",
            },
            timeout: 20000, // 20 seconds timeout
        };

        const response = await axios.request(options);
        console.log("Transfers received:", response.data);

        if (!response.data || response.data.length === 0) {
            return res.status(404).json({ error: "No transfer data found." });
        }

        res.json(response.data);
    } catch (error) {
        console.error("Error fetching transfers:", error.response ? error.response.data : error.message);
        res.status(error.response?.status || 500).json({ error: "Failed to fetch transfer data" });
    }
});


// ✅ Start the Server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
