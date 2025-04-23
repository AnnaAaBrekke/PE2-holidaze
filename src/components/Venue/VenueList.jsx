import { Link } from "react-router-dom";
import useVenues from "../../hooks/useVenues";

const VenueList = () => {
  const { venues, loading, error } = useVenues();

  if (loading) return <p className="text-center mt-8">Loading venues...</p>;
  if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-10">Top-Rated Venues</h2>

      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        {[...venues]
          .sort((a, b) => b.rating - a.rating)
          .map((venue) => (
            <div
              key={venue.id}
              className="w-full max-w-[323px] flex flex-col bg-white rounded-xl shadow-lg overflow-hidden transition hover:shadow-xl duration-300"
            >
              {/* Image + gradient */}
              <div className="relative h-[395px] w-full">
                <img
                  src={venue.media[0]?.url || "https://placehold.co/600x400"}
                  alt={venue.media[0]?.alt || venue.name}
                  className="w-full h-full object-cover rounded-t-xl"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#08323B99] to-transparent px-4 py-3 text-white">
                  <p className="text-lg font-podkova">
                    📍 {venue.location.city}, {venue.location.country}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="flex-1 px-5 py-4 flex flex-col justify-between">
                {/* Name + Rating */}
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-xl font-bold font-podkova underline line-clamp-1">
                    <Link
                      to={`/venue/${venue.id}`}
                      className="hover:text-yellow-600 transition"
                    >
                      {venue.name}
                    </Link>
                  </h3>
                  <div className="text-yellow-400 text-sm">
                    {"★".repeat(Math.floor(venue.rating))}
                    {"☆".repeat(5 - Math.floor(venue.rating))}
                  </div>
                </div>

                {/* Info */}
                <p className="text-sm mb-3">👥 Max Guests: {venue.maxGuests}</p>

                {/* Tags */}
                <div className="flex gap-2 flex-wrap mb-4">
                  {venue.meta?.wifi && (
                    <span className="bg-blue-100/40 text-sm px-3 py-1 rounded-lg">
                      Free Wifi
                    </span>
                  )}
                  {venue.meta?.breakfast && (
                    <span className="bg-blue-100/40 text-sm px-3 py-1 rounded-lg">
                      Free Breakfast
                    </span>
                  )}
                  {venue.meta?.parking && (
                    <span className="bg-blue-100/40 text-sm px-3 py-1 rounded-lg">
                      Parking
                    </span>
                  )}
                  {venue.meta?.pets && (
                    <span className="bg-blue-100/40 text-sm px-3 py-1 rounded-lg">
                      Pets allowed
                    </span>
                  )}
                </div>

                {/* Price */}
                <div className="bg-[#E0F9F6] text-black px-4 py-2 rounded-md w-fit text-sm font-medium mb-3">
                  💰 Price: ${venue.price}
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default VenueList;
