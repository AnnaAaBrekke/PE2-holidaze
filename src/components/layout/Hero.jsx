import useVenues from "../../hooks/useVenues";
import SearchBar from "../SearchBar";

const Hero = ({ setSearchNameDesc, setSearchCountry, searchNameDesc }) => {
  const { venues } = useVenues();

  // Unique country list
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
    <div className="relative h-[400px] md:h-[450px] flex items-center justify-center bg-[#08323B]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="./hero-bg.png"
          alt="Beach aerial with palm trees"
          className="w-full h-full object-cover "
        />
        {/* Overlay Image */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="absolute left-0 z-10 text-center px-4 max-w-2xl w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight drop-shadow-xl">
          Welcome to <span className="text-[#AFCDA2]">Holidaze</span>
        </h1>
        <p className="text-lg md:text-xl text-[#E0F9F6] mb-8 drop-shadow">
          Book your perfect venue from around the world — fast, easy, and
          beautiful.
        </p>

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
