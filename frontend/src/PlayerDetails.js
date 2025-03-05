import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PlayerDetails = () => {
    const { playerId } = useParams();
    const [player, setPlayer] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlayerDetails = async () => {
            try {
                console.log(`Fetching player details for ID: ${playerId}`);
                const response = await fetch(`http://localhost:5000/api/player/${playerId}`);
                if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
                const data = await response.json();
                
                if (!data || !data.player) {
                    throw new Error("Invalid player data received");
                }

                setPlayer(data.player); 
            } catch (err) {
                console.error("⚠️ Error fetching player details:", err);
                setError(err.message);
            }
        };

        fetchPlayerDetails();
    }, [playerId]);

    return (
        <div>
            <h2>🏆 Player Details</h2>
            {error ? <p style={{ color: "red" }}>Error: {error}</p> : null}
            {player ? (
                <div>
                    <p><strong>Name:</strong> {player.name || "N/A"}</p>
                    <p><strong>Short Name:</strong> {player.shortName || "N/A"}</p>

                    <h3>🏟️ Team Info</h3>
                    <p><strong>Team:</strong> {player.team?.name || "N/A"}</p>
                    <p><strong>Position:</strong> {player.position || "N/A"}</p>
                    <p><strong>Jersey Number:</strong> {player.jerseyNumber || "N/A"}</p>
                    <p><strong>Height:</strong> {player.height ? `${player.height} cm` : "N/A"}</p>
                    <p><strong>Preferred Foot:</strong> {player.preferredFoot || "N/A"}</p>
                    <p><strong>Market Value:</strong> {player.proposedMarketValue?.value ? `$${player.proposedMarketValue.value}` : "N/A"}</p>
                    <p><strong>Retired:</strong> {player.retired ? "Yes" : "No"}</p>
                    <p><strong>Deceased:</strong> {player.deceased ? "Yes" : "No"}</p>

                    <h3>🌍 Country Info</h3>
                    <p><strong>Country:</strong> {player.country?.name || "N/A"}</p>

                    <h3>📆 Contract Details</h3>
                    <p><strong>Contract Until:</strong> {player.contractUntilTimestamp ? new Date(player.contractUntilTimestamp * 1000).toLocaleDateString() : "N/A"}</p>
                    <p><strong>Date of Birth:</strong> {player.dateOfBirthTimestamp ? new Date(player.dateOfBirthTimestamp * 1000).toLocaleDateString() : "N/A"}</p>
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default PlayerDetails;
