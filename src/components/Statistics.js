import React, { useState, useEffect } from "react";
import "./Statistics.css";

const Statistics = () => {
  const [statistics, setStatistics] = useState({
    occupancyRate: 0,
    revenuePerRoom: 0,
    avgStay: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch hotel statistics from backend
  useEffect(() => {
    fetch("http://localhost:5000/hotel/statistics")
      .then((response) => response.json())
      .then((data) => {
        setStatistics(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch statistics. Please try again later.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="statistics-container">
      <div className="header">
        <h2>Hotel Statistics</h2>
      </div>

      <div className="statistics-content">
        {error && <p className="error-message">{error}</p>}
        
        <div className="stat-cards">
          <div className="stat-card">
            <h3>Occupancy Rate</h3>
            <p>{statistics.occupancyRate}%</p>
          </div>
          <div className="stat-card">
            <h3>Revenue per Room</h3>
            <p>${statistics.revenuePerRoom}</p>
          </div>
          <div className="stat-card">
            <h3>Average Stay</h3>
            <p>{statistics.avgStay} nights</p>
          </div>
        </div>

        <div className="statistics-actions">
          <button onClick={() => alert("Feature coming soon!")}>View Detailed Reports</button>
          <button onClick={() => alert("Feature coming soon!")}>Export Data</button>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
