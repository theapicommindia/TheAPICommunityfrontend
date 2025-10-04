import React from 'react';

const LocationInput = ({ value, onChange, placeholder = "Enter location", className = "" }) => {
  // Simple optimized input change handler
  const handleInputChange = React.useCallback((e) => {
    onChange(e.target.value);
  }, [onChange]);

  return (
    <input
      type="text"
      value={value}
      onChange={handleInputChange}
      placeholder={placeholder}
      className={`w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:border-black focus:ring-black ${className}`}
      autoComplete="off"
    />
  );
};

export default LocationInput;
