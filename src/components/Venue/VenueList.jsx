import useVenues from "../../hooks/useVenues";
import VenueCard from "./VenueCard";

const VenuesList = ({ searchNameDesc, searchCountry }) => {
  const { venues, loading, error } = useVenues();

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

  if (loading) return <p>Loading venues...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
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
