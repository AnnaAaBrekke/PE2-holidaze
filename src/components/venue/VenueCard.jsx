/**
 * VenueCard - Displays a venue preview card with image(s), name, rating, amenities, and price.
 * Optionally includes manager edit/delete buttons.
 *
 * @component
 * @param {Object} props
 * @param {Object} props.venue - Venue data to display.
 * @param {string} props.venue.id - Unique venue ID.
 * @param {string} props.venue.name - Venue name.
 * @param {Array<Object>} props.venue.media - Media objects ({ url, alt }).
 * @param {number} props.venue.price - Price per night.
 * @param {number} props.venue.maxGuests - Max guest capacity.
 * @param {number} props.venue.rating - Rating value (0–5).
 * @param {Object} [props.venue.location] - Venue location (city and country).
 * @param {Object} [props.venue.meta] - Amenities (wifi, breakfast, parking, pets).
 * @param {Function} [props.onEdit] - Edit handler for managers.
 * @param {Function} [props.onDelete] - Delete handler for managers.
 * @param {boolean} [props.isManager=false] - Whether to show manager actions.
 * @param {boolean} [props.isDeleting=false] - Whether the venue is being deleted.
 * @returns {JSX.Element} Venue preview card.
 */

import { Link } from "react-router-dom";
import {
  MdFreeBreakfast,
  MdGroup,
  MdLocationPin,
  MdWifi,
} from "react-icons/md";
import { FaParking, FaPaw, FaStar } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { RiCoinsFill } from "react-icons/ri";
import "../../styles/layout.css";
import "../../styles/typography.css";
import "../../styles/carousel.css";

const VenueCard = ({
  venue,
  onEdit,
  onDelete,
  isManager = false,
  isDeleting = false,
}) => {
  return (
    <div className="relative w-full max-w-[300px] bg-white rounded-lg shadow-md overflow-hidden transition hover:shadow-lg duration-300">
      <Link to={`/venue/${venue.id}`} className="block">
        {/* Image / Swiper */}
        <div className="relative h-[220px] w-full overflow-visible">
          {/* reduced height */}
          {venue.media.length > 1 ? (
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              loop={true}
              className="h-full rounded-t-lg swiper-top-pagination"
            >
              {venue.media.map((item, idx) => (
                <SwiperSlide key={`${item.url}-${idx}`}>
                  <img
                    src={item.url}
                    alt={item.alt || venue.name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
                  {/* Location Overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent px-3 py-2 text-white z-index">
                    <p className="flex items-center gap-1">
                      <MdLocationPin />
                      <span>{venue.location?.city || "City"}, </span>
                      <span className="ml-1">
                        {venue.location?.country || "Country"}
                      </span>
                    </p>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <img
              src={venue.media[0]?.url || "https://placehold.co/600x400"}
              alt={venue.media[0]?.alt || venue.name}
              className="w-full h-full object-cover rounded-t-lg"
            />
          )}
          {/* Location Overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/85 to-transparent px-3 py-2 text-white z-index">
            <p className="flex items-center gap-1">
              <MdLocationPin />
              {venue.location?.city || "City"},
              {venue.location?.country || "Country"}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <h1 className="title line-clamp-1">
              {venue?.name || "Venue Title"}
            </h1>
            <div className="flex">
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

          <p className="text-xs mb-3">
            <MdGroup className="inline" /> Max Guests: {venue.maxGuests}
          </p>

          {/* Amenities */}
          <div className="flex gap-2 flex-wrap mb-4">
            {venue.meta?.wifi && (
              <span className="meta-tag">
                <MdWifi /> Wifi
              </span>
            )}
            {venue.meta?.breakfast && (
              <span className="meta-tag">
                <MdFreeBreakfast /> Breakfast
              </span>
            )}
            {venue.meta?.parking && (
              <span className="meta-tag">
                <FaParking /> Parking
              </span>
            )}
            {venue.meta?.pets && (
              <span className="meta-tag">
                <FaPaw /> Pets
              </span>
            )}
          </div>

          <div className=" bg-color-background px-4 py-2 rounded-md body-3 w-fit font-medium">
            <RiCoinsFill className="inline" /> ${venue.price} / night
          </div>
        </div>
      </Link>

      {/* Manager Buttons */}
      {isManager && (
        <div className="flex justify-between gap-2 p-4 pt-0">
          <button
            onClick={onEdit}
            className="bg-color-primary text-white body-3 px-3 py-2 rounded-full w-1/2 shadow-sm hover:shadow-xl"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="bg-color-error text-black body-small font-medium px-3 py-2 rounded-full w-1/2 shadow-sm hover:shadow-xl hover:bg-color-error-accent"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}
    </div>
  );
};

export default VenueCard;
