/**
 * UserBookings - Displays a user's bookings, divided into upcoming and past stays.
 *
 * @component
 * @returns {JSX.Element} A sectioned view of the user's upcoming and completed bookings.
 *
 * Features:
 * - Fetches bookings from the BookingService using the authenticated user's name and token
 * - Sorts and categorizes bookings based on current date
 * - Displays loading state with skeletons and error message if fetch fails
 * - Uses `BookingCard` for each individual booking
 */

import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserBookings } from "../../services/BookingService";
import BookingCard from "./BookingCard";
import SkeletonLoader from "../common/SkeletonLoader";

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

  const now = new Date();
  const upcomingBookings = bookings.filter((b) => new Date(b.dateTo) >= now);
  const pastBookings = bookings.filter((b) => new Date(b.dateTo) < now);

  if (loading) return <SkeletonLoader type="card" count={2} />;
  if (error) return <p className="text-center text-color-error">{error}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="text-center mb-10">
        <h1 className="heading-small font-bold mb-2">Your Bookings</h1>
        <h2 className="body text-color-text-body">Upcoming and past stays.</h2>
      </div>

      {bookings.length === 0 ? (
        <p className="text-center text-gray-500">No bookings found.</p>
      ) : (
        <>
          {upcomingBookings.length > 0 && (
            <section className="mb-16">
              <div className="mb-6">
                <h3
                  className="h3 text-color-primary border-b border-color-accent
                 -hover pb-1"
                >
                  Upcoming Bookings
                </h3>
              </div>
              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center">
                {upcomingBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} />
                ))}
              </div>
            </section>
          )}

          {pastBookings.length > 0 && (
            <section>
              <div className="mb-6">
                <h3
                  className="h3 text-color-primary border-b border-color-accent
                 -hover pb-1"
                >
                  Completed Stays
                </h3>
              </div>

              <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 justify-center">
                {pastBookings.map((booking) => (
                  <BookingCard key={booking.id} booking={booking} isPast />
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default UserBookings;
