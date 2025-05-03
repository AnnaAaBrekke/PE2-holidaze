import Select from "react-select";

const SearchBar = ({
  countryOptions,
  setSearchNameDesc,
  setSearchCountry,
  searchNameDesc,
}) => {
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

  const handleClear = () => {
    setSearchNameDesc("");
  };

  return (
    <div className="flex flex-col items-center m-4">
      <div className="flex flex-col md:flex-row justify-between w-full max-w-5xl items-center text-color-text-primary">
        {/* Country Search */}
        <div className="flex-1 m-2 text-left">
          <Select
            options={countryOptions}
            onChange={handleCountryChange}
            placeholder="Search by country..."
            isClearable
            className="body-3 text-color-text-body "
            aria-label="Search by country"
          />
        </div>

        {/* Venue Name Search */}
        <div className="relative w-full md:w-2/3 m-2 text-left">
          <input
            type="text"
            value={searchNameDesc}
            onChange={handleVenueChange}
            placeholder="Search venues..."
            aria-label="Search venues.."
            className="border border-gray-300 text-color-text-body w-full p-3 rounded body-3 pr-10"
          />
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            type="button"
          >
            ✖
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
