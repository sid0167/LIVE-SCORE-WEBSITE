import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LiveScores = () => {
    const [scores, setScores] = useState([]);

    useEffect(() => {
        const fetchScores = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/scores");
                const data = await response.json();
                setScores(data.tennisPowerRankings || []);
            } catch (error) {
                console.error("Error fetching scores:", error);
            }
        };

        fetchScores();
    }, []);

    return (
        <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
            <h2 style={{ textAlign: "center", color: "#333" }}>🎾 Live Sports Scores</h2>
            {scores.length === 0 ? (
                <p style={{ textAlign: "center", fontSize: "18px", color: "gray" }}>No data available</p>
            ) : (
                <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "20px" }}>
                    <thead>
                        <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
                            <th style={tableHeaderStyle}>Set</th>
                            <th style={tableHeaderStyle}>Game</th>
                            <th style={tableHeaderStyle}>Value</th>
                            <th style={tableHeaderStyle}>Break Occurred</th>
                            <th style={tableHeaderStyle}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {scores.map((score, index) => (
                            <tr key={index} style={{ borderBottom: "1px solid #ddd", textAlign: "left" }}>
                                <td style={tableCellStyle}>{score.set}</td>
                                <td style={tableCellStyle}>{score.game}</td>
                                <td style={tableCellStyle}>{score.value}</td>
                                <td style={tableCellStyle}>{score.breakOccurred ? "Yes" : "No"}</td>
                                <td style={tableCellStyle}>
                                    <Link to={`/player/${score.playerId}`} style={buttonStyle}>View Player</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

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

export default LiveScores;
