import React from 'react';

const CitySuggestion = ({ city, onClick }) => {
  return (
    <button className="suggestion" onClick={() => onClick(city)}>
      {city.name}
    </button>
  );
};

export default CitySuggestion;
