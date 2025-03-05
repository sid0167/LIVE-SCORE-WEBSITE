import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // ✅ Import Link

const TopWinning = () => {
    const { eventId } = useParams();
    const [winners, setWinners] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTopWinning = async () => {
            if (!eventId) {
                setError("Event ID is required.");
                setLoading(false);
                return;
            }

            try {
                const response = await fetch(`http://localhost:5000/api/top-winners/${eventId}`); // ✅ Use eventId
                const data = await response.json();

                console.log("API Response:", data); // ✅ Debugging

                if (data && data.winningOddsMap) {
                    setWinners(Object.values(data.winningOddsMap)); // ✅ Convert to an array
                } else {
                    setError("No winning odds available.");
                }
            } catch (err) {
                console.error("Error fetching top winners:", err);
                setError("Failed to fetch data.");
            } finally {
                setLoading(false);
            }
        };

        fetchTopWinning();
    }, [eventId]); // ✅ Add eventId to dependencies

    return (
        <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
            <h2 style={{ textAlign: "center", color: "#333" }}>🏆 Top Winners</h2>

            {loading && <p style={{ textAlign: "center", fontSize: "18px" }}>Loading...</p>}
            {error && <p style={{ textAlign: "center", color: "red" }}>{error}</p>}

            {!loading && !error && winners.length === 0 && (
                <p style={{ textAlign: "center", fontSize: "18px", color: "gray" }}>No data available</p>
            )}

            {!loading && !error && winners.length > 0 && (
                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
                            <th style={tableHeaderStyle}>Event</th>
                            <th style={tableHeaderStyle}>Odds</th>
                            <th style={tableHeaderStyle}>Market</th>
                            <th style={tableHeaderStyle}>Bookmaker</th>
                            <th style={tableHeaderStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {winners.map((winner, index) => (
                            <tr key={index} style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>
                                <td style={tableCellStyle}>{winner.eventName || "N/A"}</td>
                                <td style={tableCellStyle}>{winner.odds || "N/A"}</td>
                                <td style={tableCellStyle}>{winner.market || "N/A"}</td>
                                <td style={tableCellStyle}>{winner.bookmaker || "N/A"}</td>
                                <td style={tableCellStyle}>
                                    {winner.playerId ? (
                                        <Link to={`/player/${winner.playerId}`} style={buttonStyle}>View Player</Link>
                                    ) : (
                                        "N/A"
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

// ✅ Reusing same styles from LiveScores.js
const tableHeaderStyle = {
    padding: "10px",
    borderBottom: "2px solid #ccc",
    fontWeight: "bold",
};

const tableCellStyle = {
    padding: "10px",
    borderBottom: "1px solid #ddd",
};

const buttonStyle = {
    padding: "5px 10px",
    backgroundColor: "#007bff",
    color: "white",
    borderRadius: "5px",
    textDecoration: "none",
};

export default TopWinning;
