import { Link } from "react-router-dom";
import { MdDateRange, MdLocationPin } from "react-icons/md";
import { FaStar, FaUsers } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";

const BookingCard = ({ booking, isPast = false }) => {
  const { venue } = booking;

  return (
    <div className="relative w-full max-w-[280px] bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/venue/${venue.id}`} className="block">
        <div className="h-[200px] relative">
          <img
            src={venue?.media?.[0]?.url || "https://placehold.co/600x400"}
            alt={venue?.media?.[0]?.alt || venue.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-2 text-white">
            <MdLocationPin className="inline-block mr-1" />
            {venue?.location?.city}, {venue?.location?.country}
          </div>
        </div>

        <div className="p-4 flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold line-clamp-1">{venue.name}</h3>
            <div className="flex" title={`Rating: ${venue.rating}`}>
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.round(venue.rating)
                      ? "text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center text-gray-600">
            <MdDateRange className="mr-1" />
            {new Date(booking.dateFrom).toLocaleDateString()} →{" "}
            {new Date(booking.dateTo).toLocaleDateString()}
          </div>

          <div className="flex items-center text-gray-600">
            <FaUsers className="mr-1" /> Guests: {booking.guests}
          </div>

          <div className="flex items-center gap-2 font-medium text-[20px] mt-2">
            <BsCheckCircleFill
              className={`${isPast ? "text-color-text-body" : "text-color-accent"} w-8 h-8`}
            />
            <span>{isPast ? "Previous Stay" : "Confirmed Booking"}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BookingCard;
