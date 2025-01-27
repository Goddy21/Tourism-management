import React, { useEffect, useState } from "react";
import "./Reservations.css";

const ReservationDetails = () => {
  const [reservations, setReservations] = useState([]);

  // Fetch all reservations from the backend
  useEffect(() => {
    fetch("http://localhost:5000/reservations", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message) {
          alert(data.message); // Handle errors from the backend
        } else {
          setReservations(data); // Update state with fetched reservations
        }
      })
      .catch((err) => {
        console.error("Error fetching reservations:", err);
        alert("Error fetching reservations.");
      });
  }, []);

  return (
    <div className="reservation-details-container">
      <h1>Reservation Details</h1>
      {reservations.length === 0 ? (
        <p>No reservations available.</p>
      ) : (
        <table className="reservation-table">
          <thead>
            <tr>
              <th>Guest Name</th>
              <th>Is Adult</th>
              <th>Children Count</th>
              <th>Hotel Preference</th>
              <th>Stay Duration</th>
              <th>Activities</th>
              <th>Travel Locations</th>
              <th>Amount</th>
              <th>Payment Mode</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation.id}>
                <td>{reservation.guestName}</td>
                <td>{reservation.isAdult ? "Yes" : "No"}</td>
                <td>{reservation.childrenCount}</td>
                <td>{reservation.hotelPreference}</td>
                <td>{reservation.stayDuration} days</td>
                <td>{reservation.activities}</td>
                <td>{reservation.travelLocations}</td>
                <td>${reservation.amount}</td>
                <td>{reservation.paymentDetails}</td>
                <td>{reservation.status || "Pending"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ReservationDetails;
