import React, { useState } from "react";
import VenuesList from "../../components/Venue/VenueList";
import Hero from "../../components/layout/Hero";

const Home = () => {
  const [searchNameDesc, setSearchNameDesc] = useState("");

  return (
    <div>
      <Hero
        setSearchNameDesc={setSearchNameDesc}
        searchNameDesc={searchNameDesc}
      />
      <main>
        <VenuesList searchNameDesc={searchNameDesc} />
      </main>
    </div>
  );
};

export default Home;
