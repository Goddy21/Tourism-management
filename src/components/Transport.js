import React, { useEffect, useState } from "react";
import "./Transport.css";

const TransportPage = () => {
  const [transportDetails, setTransportDetails] = useState([]);
  const [formData, setFormData] = useState({
    guestName: "",
    transportMeans: "",
    travelLocations: "",
    cost: "",
    paymentMethod: "",
    status: "Pending", // Default status
  });
  const [error, setError] = useState("");

  // Fetch transport-related information from the backend
  useEffect(() => {
    fetch("http://localhost:5000/transport") // Replace with your actual transport API endpoint
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch transport details");
        }
        return response.json();
      })
      .then((data) => setTransportDetails(data))
      .catch((err) => setError(err.message));
  }, []);

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate the form
    if (!formData.guestName || !formData.transportMeans || !formData.travelLocations || !formData.cost || !formData.paymentMethod) {
      alert("Please fill in all fields.");
      return;
    }

    // Save to the backend (simulate here with state update)
    fetch("http://localhost:5000/transport", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save transport details");
        }
        return response.json();
      })
      .then((newData) => {
        // Update the transport details state with the new entry
        setTransportDetails((prev) => [...prev, newData]);
        setFormData({
          guestName: "",
          transportMeans: "",
          travelLocations: "",
          cost: "",
          paymentMethod: "",
          status: "Pending",
        });
      })
      .catch((err) => setError(err.message));
  };

  return (
    <div className="transport-container">
      <div className="main-content">
        <h1>Transport Information</h1>

        {error && <p className="error-message">Error: {error}</p>}

        <form className="transport-form" onSubmit={handleSubmit}>
          <h2>Add Transport Details</h2>
          <input
            type="text"
            name="guestName"
            value={formData.guestName}
            onChange={handleChange}
            placeholder="Guest Name"
            required
          />
          <input
            type="text"
            name="transportMeans"
            value={formData.transportMeans}
            onChange={handleChange}
            placeholder="Transport Means"
            required
          />
          <select
            name="travelLocations"
            value={formData.travelLocations}
            onChange={handleChange}
            required
          >
            <option value="">Select Location</option>
            <option value="Mara">Mara</option>
            <option value="Amboseli">Amboseli</option>
            <option value="Nakuru">Nakuru</option>
            <option value="Naivasha">Naivasha</option>
            <option value="Samburu">Samburu</option>
            <option value="Ol Pejeta">Ol Pejeta</option>
            <option value="Aberdare">Aberdare</option>
          </select>
          <input
            type="number"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
            placeholder="Transport Cost (USD)"
            required
          />
          <select
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            required
          >
            <option value="">Select Payment Mode</option>
            <option value="Credit Card">Credit Card</option>
            <option value="Mobile Money">Mobile Money</option>
            <option value="Bank Transfer">Bank Transfer</option>
            <option value="Cash">Cash</option>
            <option value="PayPal">PayPal</option>
          </select>
          <button type="submit">Add Transport</button>
        </form>

        {transportDetails.length > 0 ? (
          <table className="transport-table">
            <thead>
              <tr>
                <th>Guest Name</th>
                <th>Transport Means</th>
                <th>Travel Locations</th>
                <th>Transport Cost</th>
                <th>Payment Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {transportDetails.map((transport, index) => (
                <tr key={index}>
                  <td>{transport.guestName}</td>
                  <td>{transport.transportMeans}</td>
                  <td>{transport.travelLocations}</td>
                  <td>{`$${transport.cost}`}</td>
                  <td>{transport.paymentMethod}</td>
                  <td>{transport.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No transport details available.</p>
        )}
      </div>
    </div>
  );
};

export default TransportPage;
