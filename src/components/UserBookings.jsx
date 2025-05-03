import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { MdDateRange, MdLocationPin } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { BsCheckCircleFill } from "react-icons/bs";
import { useAuth } from "../context/AuthContext";
import { getUserBookings } from "../services/BookingService";
import SkeletonLoader from "./SkeletonLoader";

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

  if (loading) return <SkeletonLoader type="card" count={2} />;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold mb-2">Your Upcoming Bookings</h2>
        <h3 className="text-gray-500">View all your upcoming stays.</h3>
      </div>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No upcoming bookings found.</p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center">
          {bookings.map((booking) => {
            const { venue } = booking;

            return (
              <div
                key={booking.id}
                className="relative w-full max-w-[280px] bg-white rounded-lg shadow-md overflow-hidden"
              >
                <Link to={`/venue/${venue.id}`} className="block">
                  {/* Image */}
                  <div className="h-[200px] relative">
                    <img
                      src={
                        venue?.media?.[0]?.url || "https://placehold.co/600x400"
                      }
                      alt={venue?.media?.[0]?.alt || venue.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-2 text-white">
                      <MdLocationPin className="inline-block mr-1" />
                      {venue?.location?.city}, {venue?.location?.country}
                    </div>
                  </div>
                  {/* Content */}
                  <div className="p-4 flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                      <h3 className="text-lg font-semibold line-clamp-1">
                        {venue.name}
                      </h3>
                      <div className="text-yellow-500">
                        {"★".repeat(Math.floor(venue.rating))}
                        {"☆".repeat(5 - Math.floor(venue.rating))}
                      </div>
                    </div>

                    <div className="flex items-center  text-gray-600">
                      <MdDateRange className="mr-1" />
                      {new Date(booking.dateFrom).toLocaleDateString()} →{" "}
                      {new Date(booking.dateTo).toLocaleDateString()}
                    </div>

                    <div className="flex items-center  text-gray-600">
                      <FaUsers className="mr-1" /> Guests: {booking.guests}
                    </div>

                    <div className="flex items-center gap-2 font-medium text-[20px] mt-2">
                      <BsCheckCircleFill className="text-color-accent w-8 h-8" />
                      <span>Confirmed Booking</span>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserBookings;
