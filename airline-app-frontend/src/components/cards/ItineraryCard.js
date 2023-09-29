import React, { useState, useEffect } from 'react';
import './ItineraryCard.css';

const ItineraryCard = ({ selectedFlightIds, onClose }) => {
  const [itineraryDetails, setItineraryDetails] = useState([]);

  useEffect(() => {
    // Fetch the itinerary details when selectedFlightIds change
    const fetchItineraryDetails = async () => {
      try {
        const response = await fetch('http://localhost:8100/api/airline/routes/getdetaileditinerary', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(selectedFlightIds),
        });

        if (!response.ok) {
          throw new Error('Request failed with status code ' + response.status);
        }

        const data = await response.json();
        setItineraryDetails(data);
      } catch (error) {
        console.error('Error fetching itinerary details:', error);
      }
    };

    if (selectedFlightIds.length > 0) {
      fetchItineraryDetails();
    }
  }, [selectedFlightIds]);

  if (itineraryDetails.length === 0) {
    return null; // Render nothing if there are no itinerary details
  }

  return (
    <div className="itinerary-card">
      
      {itineraryDetails.map((itinerary, index) => (
        <div key={index} className="itinerary-item">
          <div className="itinerary-logo">
            <img src={itinerary.airline.logo} alt={`${itinerary.airline.name} Logo`} />
          </div>
          <div>
            <span>Airline: {itinerary.airline.name}</span>
          </div>
          <div>
            <span>From: {itinerary.flyingFrom.city}, {itinerary.flyingFrom.country}</span>
          </div>
          <div>
            <span>To: {itinerary.flyingTo.city}, {itinerary.flyingTo.country}</span>
          </div>
          <div>
            <span>Flight Code: {itinerary.airline.code}</span>
          </div>
          <div>
            <span>Airport Name (From): {itinerary.flyingFrom.name}</span>
          </div>
          <div>
            <span>Airport Name (To): {itinerary.flyingTo.name}</span>
          </div>
          {/* You can add more details here */}
        </div>
      ))}
    </div>
  );
};

export default ItineraryCard;
