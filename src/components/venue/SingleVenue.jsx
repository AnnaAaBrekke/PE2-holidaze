/**
 * SingleVenue - Displays detailed information for a specific venue including
 * media carousel, details, amenities, pricing, and a booking form.
 *
 * @component
 * @returns {JSX.Element} Venue detail view with booking form and calendar.
 *
 * Features:
 * - Fetches venue by `id` from URL params
 * - Image carousel using Swiper
 * - Conditional booking form with scroll into view
 * - Amenity badges and price display
 * - Fallback for loading, error, or missing venue
 */

import { useParams } from "react-router-dom";
import useVenue from "../../hooks/useVenue";
import { FaParking, FaPaw } from "react-icons/fa";
import { MdFreeBreakfast, MdLocationPin, MdWifi } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import BookingForm from "../forms/Booking";
import StarRating from "../common/StarRating";
import VenueCalendar from "./VenueCalendar";
import SkeletonLoader from "../common/SkeletonLoader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { RiCoinsFill } from "react-icons/ri";

const SingleVenue = () => {
  const { id } = useParams();
  const { venue, loading, error, refetch } = useVenue(id);
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    if (showForm && formRef.current) {
      formRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showForm]);

  const handleOpenBookingForm = () => setShowForm((prev) => !prev);

  if (loading) return <SkeletonLoader type="card" count={1} layout="block" />;
  if (error) return <p className="text-center text-color-error">{error}</p>;
  if (!venue) return <p className="text-center">Venue not found.</p>;

  return (
    <div className="max-w-xl mx-auto p-6 relative bg-white m-4 rounded-lg">
      <div className="w-full h-[400px] rounded-xl overflow-hidden mb-6">
        {venue.media.length > 1 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop
            className="swiper-carousel"
          >
            {venue.media.map((item, idx) => (
              <SwiperSlide key={`${item.url}-${idx}`}>
                <img
                  src={item.url}
                  alt={item.alt || venue.name}
                  className="media-cover"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <img
            src={venue.media[0]?.url || "https://placehold.co/600x400"}
            alt={venue.media[0]?.alt || venue.name}
            className="w-full h-full object-cover"
          />
        )}
      </div>

      {/* Name + Price + Rating */}
      <div className="flex justify-between items-start mb-2">
        <h1 className="heading-small truncate">{venue.name}</h1>
        <div className="mt-4">
          <StarRating rating={venue.rating} />
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center gap-2 mb-4">
        <MdLocationPin className="text-[#4C4DDC] text-lg" />
        <p className="body-2 text-color-text-body">
          <span>{venue.location?.city || "City"},</span>
          <span className="ml-1">{venue.location?.country || "Country"}</span>
        </p>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h2 className="body text-color-text-secondary mb-2">Description</h2>
        <div className="relative group cursor-pointer w-full">
          <p
            className="line-clamp-3  text-color-text-body body-2"
            title={venue.description}
          >
            {venue.description}
          </p>

          <div className="absolute z-10 hidden group-hover:block body-3 text-color-text-body p-2 rounded shadow-lg w-72 top-full mt-1">
            {venue.description}
          </div>
        </div>
      </div>

      {/* Meta features (Wifi, Breakfast, Pets, Parking) */}
      <div className="flex flex-wrap gap-2 mb-6">
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
            <FaPaw /> Pets Allowed
          </span>
        )}
      </div>

      {/* Price */}
      <div className="flex items-center gap-2  bg-color-background px-4 py-2 rounded-md w-fit mb-6">
        <RiCoinsFill />
        <span className="body-3 text-black]">
          Price p/night: ${venue.price}
        </span>
      </div>

      {/* Create Booking */}
      <div className="w-full text-center">
        <button
          onClick={handleOpenBookingForm}
          className="button-primary-style w-full"
        >
          {showForm ? "Close" : "Create Booking"}
        </button>

        {showForm && (
          <div
            ref={formRef}
            className="transition-all duration-500 ease-in-out animate-fade-in"
          >
            <BookingForm
              venueId={venue.id}
              bookings={venue.bookings}
              ownerName={venue.owner?.name}
              onBookingCreated={refetch}
              maxGuests={venue.maxGuests}
              price={venue.price}
              onClose={() => setShowForm(false)}
            />
          </div>
        )}
      </div>
      {!showForm && (
        <div className="mt-5">
          <VenueCalendar bookings={venue.bookings} />
        </div>
      )}
    </div>
  );
};

export default SingleVenue;
