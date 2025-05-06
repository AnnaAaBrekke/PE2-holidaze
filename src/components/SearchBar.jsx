/**
 * SearchBar - A controlled input component for filtering venue listings by name or description.
 *
 * @component
 * @param {Object} props
 * @param {string} props.searchNameDesc - Current value of the search input.
 * @param {Function} props.setSearchNameDesc - Function to update the search input value.
 * @returns {JSX.Element} A styled search input with a clear button.
 */

const SearchBar = ({ setSearchNameDesc, searchNameDesc }) => {
  const handleVenueChange = (e) => {
    setSearchNameDesc(e.target.value);
  };

  const handleClear = () => {
    setSearchNameDesc("");
  };

  return (
    <div className="flex flex-col items-center m-4">
      <div className="flex justify-center w-full max-w-5xl items-center text-color-text-primary">
        {/* Venue Name Search */}
        <div className="relative w-full md:w-2/3 m-2 text-left">
          <input
            type="text"
            value={searchNameDesc}
            onChange={handleVenueChange}
            placeholder="Search venues..."
            aria-label="Search venues"
            className="border border-gray-300 text-color-text-body w-full p-3 rounded body-3 pr-10"
          />
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-color-text-body hover:text-color-accent"
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
