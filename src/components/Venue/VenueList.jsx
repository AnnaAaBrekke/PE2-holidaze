import useVenues from "../../hooks/useVenues";
import VenueCard from "./VenueCard";

const VenuesList = () => {
  const { venues, loading, error } = useVenues();

  if (loading) return <p>Loading venues...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
      {venues.map((venue) => (
        <VenueCard key={venue.id} venue={venue} />
      ))}
    </div>
  );
};

export default VenuesList;
