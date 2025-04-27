import Select from "react-select";

const SearchBar = ({ countryOptions, setSearchNameDesc, setSearchCountry }) => {
  const handleCountryChange = (selectedOption) => {
    if (selectedOption) {
      setSearchCountry(selectedOption.value);
    } else {
      setSearchCountry("");
    }
  };

  const handleVenueChange = (e) => {
    setSearchNameDesc(e.target.value);
  };

  return (
    <div className="flex flex-col items-center m-4">
      <div className="flex flex-col md:flex-row justify-between w-full max-w-5xl">
        {/* Country Search */}
        <div className="flex-1 m-2">
          <Select
            options={countryOptions}
            onChange={handleCountryChange}
            placeholder="Search by country..."
            isClearable
            className="text-sm"
          />
        </div>

        {/* Venue Name Search */}
        <input
          type="text"
          onChange={handleVenueChange}
          placeholder="Search venues..."
          className="border border-gray-300 w-full md:w-2/3 m-2 p-2 rounded text-sm"
        />
      </div>
    </div>
  );
};

export default SearchBar;
