import React, { useState, useRef, useEffect } from 'react';
import FlightCard from '../cards/FlightCard';
import ItineraryCard from '../cards/ItineraryCard'; // Import ItineraryCard
import './HomePage.css';

const HomePage = () => {
  const [selectedFlightIds, setSelectedFlightIds] = useState([]);
  const [tripType, setTripType] = useState('oneWay');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [journeyDate, setJourneyDate] = useState('');
  
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [flights, setFlights] = useState([]); // State to store flight search results
  const [selectedFlight, setSelectedFlight] = useState(null); // State to store selected flight details
  const [showFlightDetails, setShowFlightDetails] = useState(false); // New state
  const fromInputRef = useRef(null);
  const toInputRef = useRef(null);
  const [showFlightSearchResults, setShowFlightResults] = useState(false); // Initially set to true

  const [returnDate, setReturnDate] = useState('');
  const [selectedClasses, setSelectedClasses] = useState([]); // Use selectedClasses for class selection

  const handleRadioChange = (e) => {
    setTripType(e.target.value);
  };

  const handleFromInputChange = async (e) => {
    const inputValue = e.target.value;
    setFrom(inputValue);

    if (inputValue.trim() !== '') {
      try {
        const response = await fetch(
          `http://localhost:8100/api/airport/suggest?starting=${inputValue}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ starting: inputValue }),
          }
        );

        if (!response.ok) {
          throw new Error('Request failed with status code ' + response.status);
        }

        const airportSuggestions = await response.json();
        const limitedSuggestions = airportSuggestions.slice(0, 10);

        setFromSuggestions(limitedSuggestions);
      } catch (error) {
        console.error('Error fetching airport suggestions for "From":', error);
      }
    } else {
      setFromSuggestions([]);
    }
  };

  const handleToInputChange = async (e) => {
    const inputValue = e.target.value;
    setTo(inputValue);

    if (inputValue.trim() !== '') {
      try {
        const response = await fetch(
          `http://localhost:8100/api/airport/suggest?starting=${inputValue}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ starting: inputValue }),
          }
        );

        if (!response.ok) {
          throw new Error('Request failed with status code ' + response.status);
        }

        const airportSuggestions = await response.json();
        const limitedSuggestions = airportSuggestions.slice(0, 10);

        setToSuggestions(limitedSuggestions);
      } catch (error) {
        console.error('Error fetching airport suggestions for "To":', error);
      }
    } else {
      setToSuggestions([]);
    }
  };

  const handleAirportClick = (airport, inputRef, suggestionsStateSetter) => {
    inputRef.current.value = airport.city;
    suggestionsStateSetter([]);

    if (inputRef === fromInputRef) {
      setFrom(airport.city);
      setFromIata(airport.code); // Save IATA code for From
    } else if (inputRef === toInputRef) {
      setTo(airport.city);
      setToIata(airport.code); // Save IATA code for To
    }
  };

  const [fromIata, setFromIata] = useState(''); // State to store From IATA code
  const [toIata, setToIata] = useState(''); // State to store To IATA code

  const handleSearch = async () => {
    const startTime = performance.now();
    console.log('Trip Type:', tripType);
    console.log('From:', from);
    console.log('To:', to);
    console.log('Journey Date:', journeyDate);
    console.log('Selected Classes:', selectedClasses);
  
    // Construct the URL for the POST request
    const apiUrl = 'http://localhost:8100/api/airline/routes/onewayround';
  
    // Create the request body

    const routesList = [
      {
        date: journeyDate,
        destination: toIata,
        source: fromIata,
      },
    ];
  
    if (tripType === 'roundTrip') {
      routesList.push({
        date: returnDate,
        destination: fromIata,
        source: toIata,
      });
    }
  
    const requestBody = {
      classList: selectedClasses,
      routesList,
    };
    console.log(requestBody);
    try {
      console.log('Sending API request...');
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (!response.ok) {
        console.error('API request failed with status ' + response.status);
        // Handle the error here, e.g., show an error message to the user
        return;
      }
  
      const flightData = await response.json();
      const endTime = performance.now();
      console.log('Received flight data:', flightData);
      // Update the state with the fetched flight data
      

      
  
      setFlights(flightData);

      // Reset the selected flight details
      setSelectedFlight(null);

      const elapsedTime = endTime - startTime;
      console.log(`Response time: ${elapsedTime} ms`);
      // Print the flight data to the console
      console.log('Flight Search Results:', flightData);
    } catch (error) {
      console.error('Error fetching flight data:', error);
    }
  };
  

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    if (selectedClasses.includes(category)) {
      // If category is already selected, remove it
      setSelectedClasses((prevSelectedClasses) =>
        prevSelectedClasses.filter((cat) => cat !== category)
      );
    } else {
      // If category is not selected, add it
      setSelectedClasses((prevSelectedClasses) => [
        ...prevSelectedClasses,
        category,
      ]);
    }
  };

  // Function to fetch flight details when "View Details" is clicked
  const handleViewDetails = async (flightId) => {
    try {
      const response = await fetch(
        'http://localhost:8100/api/airline/routes/getdetaileditinerary',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([flightId]),
        }
      );
      
      if (!response.ok) {
        throw new Error('Request failed with status code ' + response.status);
      }

      const flightDetails = await response.json();
      setSelectedFlightIds([flightDetails[0].id]); // Store the selected flight ID
      
      setShowFlightDetails(true); // Set showFlightDetails to true
    } catch (error) {
      console.error('Error fetching flight details:', error);
    }
  };

  
  const handleCloseDetails = () => {
    setShowFlightDetails(false);
  };

  const handleCloseFlightResults = () => {
    setShowFlightResults(false);
  };
  const handleOpenFlightResults = () => {
    setShowFlightResults(true);
  };
  function getCurrentDate() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
    const day = currentDate.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="homepage-container">
      <div className="homepage">
        <h2>Flight Search</h2>
        <div className="trip-type">
          <label className="radio-label">
            <input
              type="radio"
              name="tripType"
              value="oneWay"
              checked={tripType === 'oneWay'}
              onChange={handleRadioChange}
            />
            One Way
          </label>

          <label className="radio-label">
            <input
              type="radio"
              name="tripType"
              value="roundTrip"
              checked={tripType === 'roundTrip'}
              onChange={handleRadioChange}
            />
            Round Trip
          </label>

          <label className="radio-label">
            <input
              type="radio"
              name="tripType"
              value="multiCity"
              checked={tripType === 'multiCity'}
              onChange={(e) => {
                if (e.target.checked) {
                  alert('Under maintenance !!');
                } else {
                  handleRadioChange(e);
                }
              }}
            />
            Multi City
          </label>
        </div>

        <div className="input-fields">
          <input
            type="text"
            placeholder="From"
            value={from}
            onChange={handleFromInputChange}
            id="from"
            ref={fromInputRef}
          />
          {fromSuggestions.length > 0 && (
            <div className="suggestions">
              {fromSuggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() =>
                    handleAirportClick(suggestion, fromInputRef, setFromSuggestions)
                  }
                >
                  {suggestion.city}
                </button>
              ))}
            </div>
          )}
          <input
            type="text"
            placeholder="To"
            value={to}
            onChange={handleToInputChange}
            id="to"
            ref={toInputRef}
          />
          {toSuggestions.length > 0 && (
            <div className="suggestions">
              {toSuggestions.map((suggestion) => (
                <button
                  key={suggestion.id}
                  onClick={() =>
                    handleAirportClick(suggestion, toInputRef, setToSuggestions)
                  }
                >
                  {suggestion.city}
                </button>
              ))}
            </div>
          )}
          <div className="date-input">
            <label htmlFor="journeyDate">Journey Date:</label>
            <input
              type="date"
              id="journeyDate"
              value={journeyDate}
              onChange={(e) => setJourneyDate(e.target.value)}
              min={getCurrentDate()}
            />
          </div>
          {tripType === 'roundTrip' && (
            <div className="date-input">
              <label htmlFor="returnDate">Return Date:</label>
              <input
                type="date"
                id="returnDate"
                placeholder="Return Date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                min={getCurrentDate()}
              />
            </div>
          )}

          <div className="category-checkboxes">
            <label>
              <h4>Select Class</h4>
            </label>
            <label>
              <input
                type="checkbox"
                value="economy"
                checked={selectedClasses.includes('economy')}
                onChange={handleCategoryChange}
              />
              Economy
            </label>
            <label>
              <input
                type="checkbox"
                value="bussiness"
                checked={selectedClasses.includes('bussiness')}
                onChange={handleCategoryChange}
              />
              Business
            </label>
            <label>
              <input
                type="checkbox"
                value="first"
                checked={selectedClasses.includes('first')}
                onChange={handleCategoryChange}
              />
              First Class
            </label>
          </div>

          <button className="btn-search" onClick={() => { handleSearch(); handleOpenFlightResults(); }}>
  Search
</button>
        </div>
      </div>

      
      {/* Display Flight Search Results */}
      {showFlightSearchResults && ( // Conditionally render based on showFlightSearchResults
        <div className="flight-search-results">
          <div className="flight-cards-container">
            <h2>Flight Search Results</h2>

            {flights && flights.length>0 && flights[0].routeResults.length > 0 ? (
  <>
    {flights[0].routeResults.map((flight) => (
      <FlightCard
        key={flight.id}
        flight={flight}
        from={from}
        to={to}
        flightClass={selectedClasses}
        onViewDetails={() => handleViewDetails(flight.id)}
      />
    ))}
  </>
) : (
  <p>No flights available for the selected criteria.</p>
)}

          </div>

          <button className="close-button" onClick={handleCloseFlightResults}>
            Close Flight Results
          </button>
        </div>
      )}

      {/* Display Return Search Results */}
{showFlightSearchResults && tripType === 'roundTrip' && (
  <div className="flight-search-results">
    <div className="flight-cards-container">
      <h2>Return Flight Search Results</h2>

      {flights && flights.length>1 && flights[1].routeResults.length>0  ? (
        <>
          {flights && flights[1].routeResults.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              from={to}
              to={from}
              flightClass={selectedClasses}
              onViewDetails={() => handleViewDetails(flight.id)}
            />
          ))}
        </>
      ) : (
        <p>No flights available for the selected criteria.</p>
      )}

    </div>

    <button className="close-button" onClick={handleCloseFlightResults}>
      Close Flight Results
    </button>
  </div>
)}


      {/* Display selected flight details */}
      {showFlightDetails && (
        <div className="flight-details-container">
          <h2>Flight Details</h2>
          <ItineraryCard selectedFlightIds={selectedFlightIds} />
          <button className="close-button" onClick={handleCloseDetails}>
            X
          </button> {/* Close button */}
        </div>
      )}
    </div>
  );
};

export default HomePage;

