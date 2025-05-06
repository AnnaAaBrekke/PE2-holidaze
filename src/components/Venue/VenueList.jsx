import { useState } from "react";
import useVenues from "../../hooks/useVenues";
import SkeletonLoader from "../SkeletonLoader";
import VenueCard from "./VenueCard";
import "../../styles/button.css";

const VenuesList = ({ searchNameDesc }) => {
  const [page, setPage] = useState(1);
  const { venues, loading, error } = useVenues();

  const venuesPerPage = 12;
  const nameDescLower = searchNameDesc.toLowerCase();

  const filteredVenues = venues.filter(({ name = "", description = "" }) => {
    return (
      name.toLowerCase().includes(nameDescLower) ||
      description.toLowerCase().includes(nameDescLower)
    );
  });

  const startIndex = (page - 1) * venuesPerPage;
  const endIndex = startIndex + venuesPerPage;
  const paginatedVenues = filteredVenues.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredVenues.length / venuesPerPage);

  const handleNextPage = () => {
    setPage((prev) => Math.min(prev + 1, totalPages));
  };

  const handlePrevPage = () => {
    setPage((prev) => (prev > 1 ? prev - 1 : 1));
  };

  if (loading) return <SkeletonLoader type="card" count={12} />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="flex flex-col items-center">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 justify-items-center mt-6">
        {paginatedVenues.length > 0 ? (
          paginatedVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))
        ) : (
          <p>No venues found.</p>
        )}
      </div>

      {/* Pagination buttons */}
      <div className="flex flex-row items-center gap-2 mt-10">
        <button
          onClick={handlePrevPage}
          className="button-secondary-style"
          disabled={page === 1}
        >
          Previous
        </button>

        <button
          onClick={handleNextPage}
          className="button-secondary-style"
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
      <div className="mt-3">
        <span className="body-3 font-semibold">
          Page {page} of {totalPages || 1}
        </span>
      </div>
    </div>
  );
};

export default VenuesList;
