import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import LiveScores from "./LiveScores";
import PlayerDetails from "./PlayerDetails";
import TopWinning from "./TopWinning";
import Transfers from "./Transfer"; // ✅ Import Transfers Component

const App = () => {
    return (
        <Router>
            <div style={{ fontFamily: "Arial, sans-serif", padding: "20px" }}>
                <nav style={{ marginBottom: "20px" }}>
                    <Link to="/" style={linkStyle}>🏆 Live Scores</Link> | 
                    <Link to="/player/750" style={linkStyle}> 🎾 Player Details</Link> | 
                    <Link to="/top-winners" style={linkStyle}> 🏅 Top Winners</Link> | 
                    <Link to="/transfer" style={linkStyle}> 🔄 Transfers</Link> {/* ✅ Added Transfers Link */}
                </nav>

                <Routes>
                    <Route path="/" element={<LiveScores />} />
                    <Route path="/player/:playerId" element={<PlayerDetails />} />
                    <Route path="/top-winners" element={<TopWinning />} />
                    <Route path="/transfer" element={<Transfers />} /> {/* ✅ Transfers Route */}
                </Routes>
            </div>
        </Router>
    );
};

const linkStyle = {
    marginRight: "15px",
    textDecoration: "none",
    fontSize: "18px",
    color: "#007bff",
};

export default App;
