import { useState } from "react";
import VenueCard from "./VenueCard";
import useVenues from "../../hooks/useVenues";
import SkeletonLoader from "../SkeletonLoader";
import "../../styles/button.css";

const VenuesList = ({ searchNameDesc, searchCountry }) => {
  const [page, setPage] = useState(1);
  const { venues, loading, error } = useVenues(page);

  const nameDescLower = searchNameDesc.toLowerCase();
  const countryLower = searchCountry.toLowerCase();

  const filteredVenues = venues.filter(
    ({ name = "", description = "", location = {} }) => {
      const country = location?.country?.toLowerCase() || "";

      const matchNameDesc =
        name.toLowerCase().includes(nameDescLower) ||
        description.toLowerCase().includes(nameDescLower);
      const matchCountry = country.includes(countryLower);

      return matchNameDesc && matchCountry;
    },
  );

  const handleNextPage = () => {
    setPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  if (loading) return <SkeletonLoader type="card" count={12} />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 justify-items-center mt-6">
        {filteredVenues.length > 0 ? (
          filteredVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))
        ) : (
          <p>No venues found.</p>
        )}
      </div>

      {/* Pagination buttons */}
      <div className="flex gap-4 m-10">
        <button
          onClick={handlePrevPage}
          className="button-secondary-style"
          disabled={page === 1}
        >
          Previous
        </button>
        <button onClick={handleNextPage} className="button-secondary-style">
          Next
        </button>
      </div>
    </div>
  );
};

export default VenuesList;
