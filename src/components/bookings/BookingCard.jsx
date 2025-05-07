/**
 * BookingCard - Displays a summary card for a single booking, including venue info,
 * dates, guests, and status (past or upcoming).
 *
 * @component
 * @param {Object} props
 * @param {Object} props.booking - Booking data.
 * @param {Object} props.booking.venue - Venue details associated with the booking.
 * @param {string} props.booking.venue.id - Unique ID of the venue.
 * @param {string} props.booking.venue.name - Name of the venue.
 * @param {Array<Object>} props.booking.venue.media - Venue images ({ url, alt }).
 * @param {Object} props.booking.venue.location - Venue location ({ city, country }).
 * @param {number} props.booking.venue.rating - Venue rating.
 * @param {string} props.booking.dateFrom - Start date of the booking.
 * @param {string} props.booking.dateTo - End date of the booking.
 * @param {number} props.booking.guests - Number of guests for the booking.
 * @param {boolean} [props.isPast=false] - Whether the booking is in the past.
 * @returns {JSX.Element} A styled card showing booking information and venue preview.
 */

import { Link } from "react-router-dom";
import { MdDateRange, MdLocationPin } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
import StarRating from "../common/StarRating";

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
            <StarRating rating={venue.rating} />
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
