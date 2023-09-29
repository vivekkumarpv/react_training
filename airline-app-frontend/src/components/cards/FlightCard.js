import React from 'react';
import './FlightCard.css'; // You can create a CSS file for styling

const FlightCard = ({ flight, from, to, flightClass, onViewDetails }) => {
  const {
    airLineIata,
    class_business,
    class_economy,
    class_first,
    min_duration,
    max_duration,
  } = flight;

  const displayClasses = [];
  if (flightClass.includes('economy') && class_economy) {
    displayClasses.push('Economy');
  }
  if (flightClass.includes('bussiness') && class_business) {
    displayClasses.push('Business');
  }
  if (flightClass.includes('first') && class_first) {
    displayClasses.push('First Class');
  }

  const averageDuration = Math.floor((min_duration + max_duration) / 2);

  return (
    <div className="flight-card">
      <div className="flight-details">
        <div>
          <span>Airline: {airLineIata}</span>
        </div>
        <div>
          <span>From: {from}</span>
        </div>
        <div>
          <span>To: {to}</span>
        </div>
      </div>
      <div className="flight-class">
        <div>
          <span>Available Classes:</span>
          <div className="flight-class-list">
            {displayClasses.map((cls) => (
              <span key={cls}>{cls}</span>
            ))}
          </div>
        </div>
        <div>
          <span>Average Duration: {averageDuration} minutes</span>
        </div>
      </div>
      <div className="view-details-button">
        <button onClick={onViewDetails}>View Details</button>
      </div>
    </div>
  );
};

export default FlightCard;
