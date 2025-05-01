import { Link } from "react-router-dom";
import {
  MdFreeBreakfast,
  MdGroup,
  MdLocationPin,
  MdWifi,
} from "react-icons/md";
import { FaParking, FaPaw } from "react-icons/fa";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { RiCoinsFill } from "react-icons/ri";

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
        <div className="relative h-[220px] w-full">
          {/* reduced height */}
          {venue.media.length > 1 ? (
            <Swiper
              modules={[Navigation, Pagination]}
              navigation
              pagination={{ clickable: true }}
              loop={true}
              className="h-full rounded-t-lg"
            >
              {venue.media.map((item, idx) => (
                <SwiperSlide key={`${item.url}-${idx}`}>
                  <img
                    src={item.url}
                    alt={item.alt || venue.name}
                    className="w-full h-full object-cover rounded-t-lg"
                  />
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
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-color-text-primary to-transparent px-3 py-2 text-white text-sm">
            <p className="flex items-center gap-1">
              <MdLocationPin />
              {venue.location?.city || "Unknown City"},
              {venue.location?.country || "Unknown Country"}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col justify-between">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold line-clamp-1">{venue.name}</h3>
            <div className="text-yellow-400 text-xs">
              {"★".repeat(Math.floor(venue.rating))}
              {"☆".repeat(5 - Math.floor(venue.rating))}
            </div>
          </div>

          <p className="text-xs mb-3">
            <MdGroup className="inline" /> Max Guests: {venue.maxGuests}
          </p>

          {/* Amenities */}
          <div className="flex gap-2 flex-wrap mb-4">
            {venue.meta?.wifi && (
              <span className="bg-blue-100/40 text-xs px-2 py-1 rounded-md flex items-center gap-1">
                <MdWifi /> Wifi
              </span>
            )}
            {venue.meta?.breakfast && (
              <span className="bg-blue-100/40 text-xs px-2 py-1 rounded-md flex items-center gap-1">
                <MdFreeBreakfast /> Breakfast
              </span>
            )}
            {venue.meta?.parking && (
              <span className="bg-blue-100/40 text-xs px-2 py-1 rounded-md flex items-center gap-1">
                <FaParking /> Parking
              </span>
            )}
            {venue.meta?.pets && (
              <span className="bg-blue-100/40 text-xs px-2 py-1 rounded-md flex items-center gap-1">
                <FaPaw /> Pets
              </span>
            )}
          </div>

          <div className=" bg-color-background px-4 py-2 rounded-md text-sm w-fit font-medium">
            <RiCoinsFill className="inline" /> ${venue.price} / night
          </div>
        </div>
      </Link>

      {/* Manager Buttons */}
      {isManager && (
        <div className="flex justify-between gap-2 p-4 pt-0">
          <button
            onClick={onEdit}
            className="bg-color-primary text-white text-sm px-3 py-2 rounded-full w-1/2"
          >
            Edit
          </button>
          <button
            onClick={onDelete}
            disabled={isDeleting}
            className="bg-color-error text-white text-sm px-3 py-2 rounded-full w-1/2"
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      )}
    </div>
  );
};

export default VenueCard;
