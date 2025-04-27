import React, { useState } from "react";
import VenuesList from "../../components/Venue/VenueList";
import Hero from "../../components/layout/Hero";

const Home = () => {
  const [searchNameDesc, setSearchNameDesc] = useState("");
  const [searchCountry, setSearchCountry] = useState("");

  return (
    <div>
      <Hero
        setSearchNameDesc={setSearchNameDesc}
        setSearchCountry={setSearchCountry}
        searchNameDesc={searchNameDesc}
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
