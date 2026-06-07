import React from 'react';

function FilterOptions({ filters, setFilters }) {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  const handleClearFilters = () => {
    setFilters({
      isAC: false,
      isNonAC: false,
      isSleeper: false,
      isSitting: false,
      isDay: false,
      isNight: false,
      isFoodAvailable: false,
      isFoodNotAvailable: false
    });
  };

  return (
    <div className="p-5 bg-white rounded-lg shadow-lg border border-gray-200 relative h-[calc(100vh-64px)] overflow-y-auto">
      <button 
        onClick={handleClearFilters} 
        className="absolute top-4 right-4 text-sm text-blue-600 hover:underline"
      >
        Clear Filters
      </button>
      
      <h2 className="text-2xl font-bold mb-6 text-blue-800">Filter Options</h2>
      
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Bus Type</h3>
        <div className="space-y-2">
          <label className="flex items-center text-gray-700">
            <input
              type="checkbox"
              name="isAC"
              checked={filters.isAC}
              onChange={handleCheckboxChange}
              className="form-checkbox h-5 w-5 text-blue-600 border-gray-300"
            />
            <span className="ml-3 text-lg">AC</span>
          </label>
          <label className="flex items-center text-gray-700">
            <input
              type="checkbox"
              name="isNonAC"
              checked={filters.isNonAC}
              onChange={handleCheckboxChange}
              className="form-checkbox h-5 w-5 text-blue-600 border-gray-300"
            />
            <span className="ml-3 text-lg">Non-AC</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Bus Class</h3>
        <div className="space-y-2">
          <label className="flex items-center text-gray-700">
            <input
              type="checkbox"
              name="isSleeper"
              checked={filters.isSleeper}
              onChange={handleCheckboxChange}
              className="form-checkbox h-5 w-5 text-blue-600 border-gray-300"
            />
            <span className="ml-3 text-lg">Sleeper</span>
          </label>
          <label className="flex items-center text-gray-700">
            <input
              type="checkbox"
              name="isSitting"
              checked={filters.isSitting}
              onChange={handleCheckboxChange}
              className="form-checkbox h-5 w-5 text-blue-600 border-gray-300"
            />
            <span className="ml-3 text-lg">Sitting</span>
          </label>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Timing</h3>
        <div className="space-y-2">
          <label className="flex items-center text-gray-700">
            <input
              type="checkbox"
              name="isDay"
              checked={filters.isDay}
              onChange={handleCheckboxChange}
              className="form-checkbox h-5 w-5 text-blue-600 border-gray-300"
            />
            <span className="ml-3 text-lg">Day</span>
          </label>
          <label className="flex items-center text-gray-700">
            <input
              type="checkbox"
              name="isNight"
              checked={filters.isNight}
              onChange={handleCheckboxChange}
              className="form-checkbox h-5 w-5 text-blue-600 border-gray-300"
            />
            <span className="ml-3 text-lg">Night</span>
          </label>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">Food Facility</h3>
        <label className="flex items-center text-gray-700">
          <input
            type="checkbox"
            name="isFoodAvailable"
            checked={filters.isFoodAvailable}
            onChange={handleCheckboxChange}
            className="form-checkbox h-5 w-5 text-blue-600 border-gray-300"
          />
          <span className="ml-3 text-lg">Available</span>
        </label>

        <label className="flex items-center text-gray-700">
          <input
            type="checkbox"
            name="isFoodNotAvailable"
            checked={filters.isFoodNotAvailable}
            onChange={handleCheckboxChange}
            className="form-checkbox h-5 w-5 text-blue-600 border-gray-300"
          />
          <span className="ml-3 text-lg">Not Available</span>
        </label>
      </div>
    </div>
  );
}

export default FilterOptions;
