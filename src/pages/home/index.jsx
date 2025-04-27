import React, { useState } from "react";
import VenuesList from "../../components/Venue/VenueList";
import Hero from "../../components/layout/Hero";

const Home = () => {
  const [searchNameDescInput, setSearchNameDescInput] = useState("");
  const [searchCountryInput, setSearchCountryInput] = useState("");

  const [searchNameDesc, setSearchNameDesc] = useState("");
  const [searchCountry, setSearchCountry] = useState("");

  const handleSearch = () => {
    setSearchNameDesc(searchNameDescInput);
    setSearchCountry(searchCountryInput);
  };

  return (
    <div>
      <Hero
        searchNameDescInput={searchNameDescInput}
        setSearchNameDescInput={setSearchNameDescInput}
        searchCountryInput={searchCountryInput}
        setSearchCountryInput={setSearchCountryInput}
        handleSearch={handleSearch}
      />
      <main>
        <VenuesList
          searchNameDesc={searchNameDesc}
          searchCountry={searchCountry}
        />
      </main>
    </div>
  );
};

export default Home;
