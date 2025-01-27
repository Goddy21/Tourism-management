import React, { useState } from "react";
import "./FrontDesk.css";

const FrontDesk = () => {
  const [guestName, setGuestName] = useState("");
  const [isAdult, setIsAdult] = useState(true);
  const [childrenCount, setChildrenCount] = useState(0);
  const [hotelPreference, setHotelPreference] = useState("");
  const [stayDuration, setStayDuration] = useState(0);
  const [activities, setActivities] = useState("");
  const [availableActivities, setAvailableActivities] = useState([]);
  const [travelLocations, setTravelLocations] = useState("");
  const [amount, setAmount] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [parkFee, setParkFee] = useState(0);
  const [paymentMode, setPaymentMode] = useState("");

  const updateHotels = (location) => {
    setHotelPreference(`Preferred hotel near ${location}`);
  };

  const updateParkFee = (location) => {
    let fee = 0;
    switch (location) {
      case "Mara":
        fee = 80;
        break;
      case "Amboseli":
        fee = 60;
        break;
      case "Nakuru":
        fee = 50;
        break;
      case "Naivasha":
        fee = 45;
        break;
      case "Samburu":
        fee = 70;
        break;
      case "Ol Pejeta":
        fee = 55;
        break;
      case "Aberdare":
        fee = 65;
        break;
      default:
        fee = 0;
    }
    setParkFee(fee);
  };

  const updateActivities = (location) => {
    let activitiesList = [];
    switch (location) {
      case "Mara":
        activitiesList = ["Game Drives", "Hot Air Balloon Safari", "Nature Walks"];
        break;
      case "Amboseli":
        activitiesList = ["Game Drives", "Cultural Visits", "Bird Watching"];
        break;
      case "Nakuru":
        activitiesList = ["Lake Tour", "Bird Watching", "Hiking"];
        break;
      case "Naivasha":
        activitiesList = ["Boat Rides", "Hiking at Hell's Gate", "Nature Walks"];
        break;
      case "Samburu":
        activitiesList = ["Game Drives", "Cultural Dances", "Nature Walks"];
        break;
      case "Ol Pejeta":
        activitiesList = ["Visit to Rhino Sanctuary", "Game Drives", "Night Safari"];
        break;
      case "Aberdare":
        activitiesList = ["Waterfall Visits", "Hiking", "Fishing"];
        break;
      default:
        activitiesList = [];
    }
    setAvailableActivities(activitiesList);
  };

  const updateTotal = () => {
    const total = stayDuration * parkFee;
    setAmount(total);
  };

  const handleAddReservation = () => {
    fetch("http://localhost:5000/reservations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        guestName,
        isAdult,
        childrenCount,
        hotelPreference,
        stayDuration,
        activities,
        travelLocations,
        amount,
        paymentDetails: paymentMode,
        selectedLocation,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        setGuestName("");
        setIsAdult(true);
        setChildrenCount(0);
        setHotelPreference("");
        setStayDuration(0);
        setActivities("");
        setAvailableActivities([]);
        setTravelLocations("");
        setAmount(0);
        setPaymentDetails("");
        setSelectedLocation("");
        setParkFee(0);
        setPaymentMode("");
      })
      .catch((err) => console.error("Error adding reservation:", err));
  };

  return (
    <div className="front-desk-container">
      <div className="main-content">
        <div className="front-desk-header">
          <p>Manage new and existing reservations</p>
        </div>

        <div className="front-desk-actions">
          <div className="action-card">
            <input
              type="text"
              placeholder="Guest Name"
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
            />
          </div>
          <div className="action-card">
            <select
              value={isAdult}
              onChange={(e) => setIsAdult(e.target.value === "true")}
            >
              <option value="true">Adult</option>
              <option value="false">Child</option>
            </select>
          </div>
          <div className="action-card">
            <input
              type="number"
              placeholder="Number of Children"
              value={childrenCount}
              onChange={(e) => setChildrenCount(Number(e.target.value))}
              disabled={isAdult}
            />
          </div>

          <div className="action-card">
            <select
              value={selectedLocation}
              onChange={(e) => {
                const location = e.target.value;
                setSelectedLocation(location);
                updateHotels(location);
                updateParkFee(location);
                updateActivities(location);
                updateTotal();
              }}
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
          </div>

          <div className="action-card">
            <input
              type="text"
              placeholder="Hotel Preference"
              value={hotelPreference}
              onChange={(e) => setHotelPreference(e.target.value)}
            />
          </div>
          <div className="action-card">
            <input
              type="number"
              placeholder="Duration of Stay (days)"
              value={stayDuration}
              onChange={(e) => {
                setStayDuration(Number(e.target.value));
                updateTotal();
              }}
            />
          </div>

          <div className="action-card">
            <select
              value={activities}
              onChange={(e) => setActivities(e.target.value)}
            >
              <option value="">Select Activity</option>
              {availableActivities.map((activity, index) => (
                <option key={index} value={activity}>
                  {activity}
                </option>
              ))}
            </select>
          </div>

          <div className="action-card">
            <textarea
              placeholder="Travel Locations via Hotel Transport"
              value={travelLocations}
              onChange={(e) => setTravelLocations(e.target.value)}
            />
          </div>
          <div className="action-card">
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              readOnly
            />
          </div>

          <div className="action-card">
            <select
              value={paymentMode}
              onChange={(e) => setPaymentMode(e.target.value)}
            >
              <option value="">Select Payment Mode</option>
              <option value="Credit Card">Credit Card</option>
              <option value="Mobile Money">Mobile Money</option>
              <option value="Bank Transfer">Bank Transfer</option>
              <option value="Cash">Cash</option>
              <option value="PayPal">PayPal</option>
            </select>
          </div>

          <div className="action-card">
            <button onClick={handleAddReservation}>
              Add New Reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrontDesk;
