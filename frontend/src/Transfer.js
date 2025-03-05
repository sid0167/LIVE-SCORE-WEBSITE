import React, { useState, useEffect } from "react";

const Transfers = () => {
    const [transfers, setTransfers] = useState([]); // Initialize as an empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransfers = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/transfer");
                if (!response.ok) throw new Error("Failed to fetch transfers");

                const data = await response.json();

                // Check if data has 'transfers' and if it's an array
                if (data && Array.isArray(data.transfers)) {
                    setTransfers(data.transfers);
                } else {
                    throw new Error("Unexpected API response format");
                }
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchTransfers();
    }, []);

    if (loading) return <p>Loading transfers...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    return (
        <div>
            <h2>🔄 Transfer Index</h2>
            {transfers.length === 0 ? (
                <p>No transfers available.</p>
            ) : (
                <ul>
                    {transfers.map((transfer, index) => (
                        <li key={index}>
                            {/* Assuming 'player' is an object with a 'name' property */}
                            <strong>{transfer.player && transfer.player.name ? transfer.player.name : "Unknown Player"}</strong> moved from
                            <strong> {transfer.fromTeamName || "Unknown Team"}</strong> to
                            <strong> {transfer.toTeamName || "Unknown Team"}</strong>
                            on {new Date(transfer.transferDateTimestamp * 1000).toLocaleDateString() || "Unknown Date"}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Transfers;