import { useParams } from "react-router-dom";
import useVenue from "../../hooks/useVenue";
import { FaDollarSign, FaParking, FaPaw, FaStar } from "react-icons/fa";
import { MdFreeBreakfast, MdLocationPin, MdWifi } from "react-icons/md";
import VenueCalendar from "./VenueCalender";
import { useEffect, useRef, useState } from "react";
import BookingForm from "../forms/Booking";
import SkeletonLoader from "../SkeletonLoader";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
  if (error) return <p className="text-center text-red-500">{error}</p>;
  if (!venue) return <p className="text-center">Venue not found.</p>;

  return (
    <div className="max-w-xl mx-auto p-6 relative">
      <div className="w-full h-[400px] rounded-xl overflow-hidden mb-6">
        {venue.media.length > 1 ? (
          <Swiper
            modules={[Navigation, Pagination]}
            navigation
            pagination={{ clickable: true }}
            loop={true}
            className="h-full"
          >
            <style>
              {`
      .swiper-button-next,
      .swiper-button-prev {
        color: white;
      }

      .swiper-pagination-bullet {
        background-color: white;
        opacity: 0.7;
      }

      .swiper-pagination-bullet-active {
        background-color: white;
        opacity: 1;
      }
    `}
            </style>

            {venue.media.map((item, index) => (
              <SwiperSlide key={index}>
                <img
                  src={item.url}
                  alt={item.alt || venue.name}
                  className="w-full h-full object-cover"
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
        <h1 className="text-2xl font-bold font-podkova underline break-all">
          {venue.name}
        </h1>
        <div className="flex gap-1">
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

      {/* Location */}
      <div className="flex items-center gap-2 mb-4">
        <MdLocationPin className="text-[#4C4DDC] text-lg" />
        <p className="text-sm text-[#939393] font-podkova">
          {venue.location.address || ""}, {venue.location.city},{" "}
          {venue.location.country}
        </p>
      </div>

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-xl font-podkova font-medium text-[#101010] mb-2">
          Description
        </h2>
        <p className="text-[#939393] text-lg font-podkova leading-[1.5]">
          {venue.description}
        </p>
      </div>

      {/* Meta features (Wifi, Breakfast, Pets, Parking) */}
      <div className="flex flex-wrap gap-2 mb-6">
        {venue.meta?.wifi && (
          <span className="flex items-center gap-2 bg-blue-100/40 px-3 py-2 rounded-md text-sm">
            <MdWifi /> Wifi
          </span>
        )}
        {venue.meta?.breakfast && (
          <span className="flex items-center gap-2 bg-blue-100/40 px-3 py-2 rounded-md text-sm">
            <MdFreeBreakfast /> Breakfast
          </span>
        )}
        {venue.meta?.parking && (
          <span className="flex items-center gap-2 bg-blue-100/40 px-3 py-2 rounded-md text-sm">
            <FaParking /> Parking
          </span>
        )}
        {venue.meta?.pets && (
          <span className="flex items-center gap-2 bg-blue-100/40 px-3 py-2 rounded-md text-sm">
            <FaPaw /> Pets Allowed
          </span>
        )}
      </div>

      {/* Price */}
      <div className="flex items-center gap-2 bg-[#E0F9F6] px-4 py-2 rounded-md w-fit mb-6">
        <FaDollarSign />
        <span className="text-sm font-podkova text-[#101010]">
          Price p/night: {venue.price}
        </span>
      </div>

      {/* Create Booking */}
      <div className="w-full text-center">
        <button
          onClick={handleOpenBookingForm}
          className="w-full bg-[#0F6474] text-white font-podkova text-lg font-semibold py-3 rounded-lg hover:bg-[#0c4e5a] transition"
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
