import { DebounceInput } from "react-debounce-input";

const SearchBar = ({
  searchNameDescInput,
  setSearchNameDescInput,
  searchCountryInput,
  setSearchCountryInput,
  handleSearch,
}) => {
  return (
    <div className="flex justify-between m-1">
      <DebounceInput
        minLength={2}
        debounceTimeout={300}
        onChange={(e) => setSearchCountryInput(e.target.value)}
        value={searchCountryInput}
        placeholder="Search by country..."
        className="border border-gray w-220 m-2 p-2"
      />
      <DebounceInput
        minLength={2}
        debounceTimeout={300}
        onChange={(e) => setSearchNameDescInput(e.target.value)}
        value={searchNameDescInput}
        placeholder="Search venues..."
        className="border border-gray w-2/3 m-2 p-2"
      />
      <button
        onClick={handleSearch}
        className="bg-[#0F6474] text-[#E0F9F6] shadow-md rounded px-2 font-podkova font-semibold"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
