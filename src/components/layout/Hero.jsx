import SearchBar from "../SearchBar";

const Hero = ({ setSearchNameDesc, searchNameDesc }) => {
  return (
    <div className="relative h-[400px] md:h-[450px] flex items-center justify-center bg-color-text-primary">
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
          Welcome to <span className="text-color-accent">Holidaze</span>
        </h1>
        <p className="text-lg md:text-xl text-color-background mb-8 drop-shadow">
          Book your perfect venue from around the world — fast, easy, and
          beautiful.
        </p>

        <SearchBar
          setSearchNameDesc={setSearchNameDesc}
          searchNameDesc={searchNameDesc}
        />
      </div>
    </div>
  );
};

export default Hero;
