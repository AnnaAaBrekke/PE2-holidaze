import { Link } from "react-router-dom";
import {
  MdFreeBreakfast,
  MdGroup,
  MdLocationPin,
  MdWifi,
} from "react-icons/md";
import { FaDollarSign, FaParking, FaPaw } from "react-icons/fa";

const VenueCard = ({
  venue,
  onEdit,
  onDelete,
  isManager = false,
  isDeleting = false,
}) => {
  return (
    <div className="relative w-full max-w-[323px] min-h-[620px] bg-white rounded-xl shadow-lg overflow-hidden transition hover:shadow-xl duration-300">
      {/* Image */}
      <div className="relative h-[395px] w-full">
        <img
          src={venue.media[0]?.url || "https://placehold.co/600x400"}
          alt={venue.media[0]?.alt || venue.name}
          className="w-full h-full object-cover rounded-t-xl"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#08323B99] to-transparent px-4 py-3 text-white">
          <p className="text-lg font-podkova flex items-center gap-1">
            <MdLocationPin />
            {venue.location?.city || "Unknown City"},{" "}
            {venue.location?.country || "Unknown Country"}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col justify-between">
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

        <p className="text-sm mb-3">
          <MdGroup className="inline" /> Max Guests: {venue.maxGuests}
        </p>

        <div className="flex gap-2 flex-wrap mb-4">
          {venue.meta?.wifi && (
            <span className="bg-blue-100/40 text-sm px-3 py-1 rounded-lg flex items-center gap-1">
              <MdWifi /> Wifi
            </span>
          )}
          {venue.meta?.breakfast && (
            <span className="bg-blue-100/40 text-sm px-3 py-1 rounded-lg flex items-center gap-1">
              <MdFreeBreakfast /> Breakfast
            </span>
          )}
          {venue.meta?.parking && (
            <span className="bg-blue-100/40 text-sm px-3 py-1 rounded-lg flex items-center gap-1">
              <FaParking /> Parking
            </span>
          )}
          {venue.meta?.pets && (
            <span className="bg-blue-100/40 text-sm px-3 py-1 rounded-lg flex items-center gap-1">
              <FaPaw /> Pets
            </span>
          )}
        </div>

        <div className="bg-[#E0F9F6] px-4 py-2 rounded-md text-sm w-fit font-medium mb-3">
          <FaDollarSign className="inline" /> ${venue.price}
        </div>

        {isManager && (
          <div className="flex justify-between gap-2 mt-2">
            <button
              onClick={onEdit}
              className="bg-[#0F6474] text-white font-semibold px-4 py-2 rounded-full w-1/2"
            >
              Edit
            </button>
            <button
              onClick={onDelete}
              disabled={isDeleting}
              className="bg-[#E85757] text-white font-semibold px-4 py-2 rounded-full w-1/2"
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default VenueCard;
