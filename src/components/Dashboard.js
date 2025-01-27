import React from "react";
import "./Dashboard.css";

const Dashboard = () => {
  // Mocked statistics data
  const stats = {
    current_guests: 120,
    new_reservations: 45,
    pending_tasks: 10,
    total_revenue: 5120,
  };

  // Mocked activities data
  const activities = [
    { description: "New reservation made", created_at: "2025-01-25T12:30:00Z" },
    { description: "Room service completed", created_at: "2025-01-24T14:20:00Z" },
    { description: "Payment received", created_at: "2025-01-23T09:00:00Z" },
  ];

  return (
    <div className="dashboard-container">
      <div className="main-content">
        <div className="dashboard-header">
          <p>Overview of hotel performance and operations</p>
        </div>

        {/* Statistics Section */}
        <div className="dashboard-stats">
          <div className="stat-card">
            <h2>{stats.current_guests}</h2>
            <p>Current Guests</p>
          </div>
          <div className="stat-card">
            <h2>{stats.new_reservations}</h2>
            <p>New Reservations</p>
          </div>
          <div className="stat-card">
            <h2>{stats.pending_tasks}</h2>
            <p>Pending Tasks</p>
          </div>
          <div className="stat-card">
            <h2>${stats.total_revenue}</h2>
            <p>Total Revenue</p>
          </div>
        </div>

        {/* Additional Dashboard Content */}
        <div className="dashboard-content">
          <div className="recent-activities">
            <h3>Recent Activities</h3>
            {activities.length === 0 ? (
              <p>No recent activities</p>
            ) : (
              <ul>
                {activities.map((activity, index) => (
                  <li key={index}>
                    {activity.description} (at {new Date(activity.created_at).toLocaleString()})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <button>Add Reservation</button>
            <button>View Reports</button>
            <button>Manage Staff</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
