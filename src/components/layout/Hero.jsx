import SearchBar from "../SearchBar";

const Hero = ({
  searchNameDescInput,
  setSearchNameDescInput,
  searchCountryInput,
  setSearchCountryInput,
  handleSearch,
}) => {
  return (
    <>
      <div>
        <SearchBar
          searchNameDescInput={searchNameDescInput}
          setSearchNameDescInput={setSearchNameDescInput}
          searchCountryInput={searchCountryInput}
          setSearchCountryInput={setSearchCountryInput}
          handleSearch={handleSearch}
        />
      </div>
    </>
  );
};

export default Hero;
