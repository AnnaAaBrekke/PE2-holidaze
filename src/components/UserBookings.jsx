import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdDateRange, MdLocationPin } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import { getUserBookings } from "../services/BookingService";
import { GiConfirmed } from "react-icons/gi";
import { BsCheckCircleFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";

const UserBookings = () => {
  const { user, token } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user?.name) return;
      setLoading(true);
      try {
        const result = await getUserBookings(user.name, token);
        const sortedBookings = (result.data || []).sort(
          (a, b) => new Date(a.dateFrom) - new Date(b.dateFrom),
        );

        setBookings(sortedBookings);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [user?.name, token]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
        <h2>Your Upcoming Bookings</h2>

        {loading && <p>Loading your bookings...</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && bookings.length === 0 && (
          <p>No upcoming bookings found.</p>
        )}

        <div className="row gap-4 mt-4">
          {bookings.map((booking) => {
            const { venue } = booking;

            return (
              <div
                key={booking.id}
                className="relative w-[323px] h-[596px] bg-white rounded-xl shadow-lg overflow-hidden"
              >
                {/* Image */}
                <div className="absolute top-[30px] left-[11px] w-[300px] h-[395px]">
                  <img
                    src={
                      venue?.media?.[0]?.url || "https://placehold.co/300x395"
                    }
                    alt={venue?.media?.[0]?.alt || venue.name}
                    className="w-full h-full object-cover rounded-[10px]"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute bottom-0 w-full h-[30%] bg-gradient-to-t from-[#08323B99] to-transparent rounded-b-[10px] px-4 py-2 text-white">
                    <p className="text-[22px] font-podkova leading-[24px]">
                      <MdLocationPin className="inline-block mr-1 -mt-1" />
                      {venue?.location.city}, {venue?.location.country}
                    </p>
                  </div>
                </div>

                {/* Name + Stars */}
                <div className="absolute top-[435px] left-[18px] right-[18px] flex justify-between items-center">
                  <h3 className="text-[24px] font-bold font-podkova underline line-clamp-1">
                    <Link
                      to={`/venue/${venue.id}`}
                      className="hover:text-yellow-600"
                    >
                      {venue.name}
                    </Link>
                  </h3>
                  <div className="text-yellow-400 text-sm flex">
                    {"★".repeat(Math.floor(venue.rating))}
                    {"☆".repeat(5 - Math.floor(venue.rating))}
                  </div>
                </div>

                {/* Booking Dates */}
                <div className="absolute top-[480px] left-[18px] bg-[#E0F9F6] px-3 py-2 rounded-[8px] text-sm flex items-center gap-2 font-podkova">
                  <MdDateRange className="text-black" />
                  {new Date(booking.dateFrom).toLocaleDateString()} →{" "}
                  {new Date(booking.dateTo).toLocaleDateString()}
                </div>

                {/* Guest Count */}
                <div className="absolute top-[482px] left-[186px] bg-blue-100/40 px-3 py-1 rounded-[8px] text-sm flex items-center gap-2 font-podkova">
                  <FaUsers className="text-black" />
                  {booking.guests}
                </div>

                {/* Confirmed label */}
                <div className="absolute bottom-[10px] left-4 text-center font-podkova font-semibold text-[24px] flex gap-x-2">
                  <BsCheckCircleFill className="text-[#AFCDA2] w-12 h-12" />
                  <p>Confirmed Booking</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserBookings;
