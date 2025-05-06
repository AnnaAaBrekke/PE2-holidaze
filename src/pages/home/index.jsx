import React, { useState } from "react";
import VenueList from "../../components/venue/VenueList";
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
        <VenueList searchNameDesc={searchNameDesc} />
      </main>
    </div>
  );
};

export default Home;
