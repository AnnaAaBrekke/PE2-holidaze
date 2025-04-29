import useVenues from "../../hooks/useVenues";
import SearchBar from "../SearchBar";

const Hero = ({ setSearchNameDesc, setSearchCountry, searchNameDesc }) => {
  const { venues } = useVenues();

  // Create unique country options
  const countryOptions = venues
    .map((venue) => ({
      value: venue.location.country,
      label: venue.location.country,
    }))
    .filter(
      (option, index, self) =>
        index === self.findIndex((o) => o.value === option.value),
    );

  return (
    <div className="py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-6">
          Find Your Perfect Venue
        </h1>

        <SearchBar
          countryOptions={countryOptions}
          setSearchNameDesc={setSearchNameDesc}
          setSearchCountry={setSearchCountry}
          searchNameDesc={searchNameDesc}
        />
      </div>
    </div>
  );
};

export default Hero;
