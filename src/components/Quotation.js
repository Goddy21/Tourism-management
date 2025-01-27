import React, { useState, useEffect } from "react";
import "./Quotation.css";

const Quotation = () => {
  const [customerName, setCustomerName] = useState("");
  const [selectedHotel, setSelectedHotel] = useState("");
  const [stayDuration, setStayDuration] = useState(1);
  const [selectedTransport, setSelectedTransport] = useState("");
  const [activityList, setActivityList] = useState("");
  const [quotationDetails, setQuotationDetails] = useState(null);

  const [transportDetails, setTransportDetails] = useState([]);
  const [frontDeskDetails, setFrontDeskDetails] = useState([]);

  const hotels = [
    { name: "Ocean View Hotel", location: "Mombasa", pricePerNight: 120 },
    { name: "Mountain Escape Lodge", location: "Nakuru", pricePerNight: 80 },
    { name: "City Lights Inn", location: "Nairobi", pricePerNight: 100 },
  ];

  useEffect(() => {
    // Simulate fetching transport details from TransportPage API
    fetch("http://localhost:5000/transport") // Replace with actual TransportPage API
      .then((response) => response.json())
      .then((data) => setTransportDetails(data))
      .catch((err) => console.error("Failed to fetch transport details:", err));

    // Simulate fetching front desk details
    fetch("http://localhost:5000/frontDesk") // Replace with actual FrontDesk API
      .then((response) => response.json())
      .then((data) => setFrontDeskDetails(data))
      .catch((err) => console.error("Failed to fetch front desk details:", err));
  }, []);

  const calculateQuotation = () => {
    const selectedHotelDetails = hotels.find(
      (hotel) => hotel.name === selectedHotel
    );

    const selectedTransportDetails = transportDetails.find(
      (transport) => transport.guestName === selectedTransport
    );

    if (!selectedHotelDetails) {
      alert("Please select a hotel.");
      return;
    }

    const totalHotelCost = selectedHotelDetails.pricePerNight * stayDuration;
    const transportCost = selectedTransportDetails?.cost || 0;
    const totalCost = totalHotelCost + transportCost;

    setQuotationDetails({
      customerName,
      hotelName: selectedHotelDetails.name,
      hotelLocation: selectedHotelDetails.location,
      stayDuration,
      totalHotelCost,
      transportOption: selectedTransportDetails?.transportMeans || "None",
      transportCost,
      activities: activityList,
      totalCost,
    });
  };

  return (
    <div className="quotation-container">
      <h1>Quotation Page</h1>

      <div className="quotation-form">
        <input
          type="text"
          placeholder="Customer Name"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />

        <select
          value={selectedHotel}
          onChange={(e) => setSelectedHotel(e.target.value)}
        >
          <option value="">Select Hotel</option>
          {hotels.map((hotel, index) => (
            <option key={index} value={hotel.name}>
              {hotel.name} ({hotel.location}) - ${hotel.pricePerNight}/night
            </option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Duration of Stay (nights)"
          value={stayDuration}
          onChange={(e) => setStayDuration(Number(e.target.value))}
          min="1"
        />

        <select
          value={selectedTransport}
          onChange={(e) => setSelectedTransport(e.target.value)}
        >
          <option value="">Select Transport Option</option>
          {transportDetails.map((transport, index) => (
            <option key={index} value={transport.guestName}>
              {transport.guestName} - {transport.transportMeans} (${transport.cost})
            </option>
          ))}
        </select>

        <textarea
          placeholder="Activities to Include"
          value={activityList}
          onChange={(e) => setActivityList(e.target.value)}
        ></textarea>

        <div className="frontdesk-summary">
          <h3>Front Desk Information</h3>
          <ul>
            {frontDeskDetails.map((detail, index) => (
              <li key={index}>{detail}</li>
            ))}
          </ul>
        </div>

        <button onClick={calculateQuotation}>Generate Quotation</button>
      </div>

      {quotationDetails && (
        <div className="quotation-details">
          <h2>Quotation Details</h2>
          <p>Customer Name: {quotationDetails.customerName}</p>
          <p>Hotel: {quotationDetails.hotelName}</p>
          <p>Location: {quotationDetails.hotelLocation}</p>
          <p>Duration of Stay: {quotationDetails.stayDuration} nights</p>
          <p>Hotel Cost: ${quotationDetails.totalHotelCost}</p>
          <p>Transport Option: {quotationDetails.transportOption}</p>
          <p>Transport Cost: ${quotationDetails.transportCost}</p>
          <p>Activities: {quotationDetails.activities || "None"}</p>
          <h3>Total Cost: ${quotationDetails.totalCost}</h3>
        </div>
      )}
    </div>
  );
};

export default Quotation;
