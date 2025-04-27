import { useState } from "react";
import useVenues from "../../hooks/useVenues";
import VenueCard from "./VenueCard";
import { DebounceInput } from "react-debounce-input";

const VenuesList = () => {
  const { venues, loading, error } = useVenues();
  const [searchTerm, setSearchTerm] = useState("");

  const searchLowerCase = searchTerm.toLowerCase();

  const filteredVenues = venues.filter(({ name = "", description = "" }) => {
    return (
      name.toLowerCase().includes(searchLowerCase) ||
      description.toLowerCase().includes(searchLowerCase)
    );
  });

  if (loading) return <p>Loading venues...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div>
        <DebounceInput
          minLength={2}
          debounceTimeout={300}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search Venues..."
          className="border border-gray w-full m-2"
        />
      </div>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {filteredVenues.length > 0 ? (
          filteredVenues.map((venue) => (
            <VenueCard key={venue.id} venue={venue} />
          ))
        ) : (
          <p>No venues found.</p>
        )}
      </div>
    </div>
  );
};

export default VenuesList;
