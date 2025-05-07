/**
 * ManagerStats - Displays total statistics for a venue manager.
 *
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.venues - Array of venues managed by the user, each with optional `bookings` and `price`.
 * @returns {JSX.Element} A UI block showing total venues, bookings, and estimated earnings.
 *
 * Features:
 * - Calculates total number of venues
 * - Aggregates total bookings across all venues
 * - Estimates earnings based on booking durations and venue price
 */
const ManagerStats = ({ venues }) => {
  const totalVenues = venues.length;

  const totalBookings = venues.reduce(
    (total, venue) => total + (venue.bookings?.length || 0),
    0,
  );

  const totalEarnings = venues.reduce((total, venue) => {
    if (!venue.bookings || venue.bookings.length === 0) return total;

    const venueEarnings = venue.bookings.reduce((venueTotal, booking) => {
      const nights = Math.max(
        (new Date(booking.dateTo) - new Date(booking.dateFrom)) /
          (1000 * 60 * 60 * 24),
        1,
      );
      return venueTotal + nights * venue.price;
    }, 0);

    return total + venueEarnings;
  }, 0);

  return (
    <div className="flex flex-wrap justify-center gap-8 mt-8 text-gray-700 body-3">
      <div className="flex flex-col items-center">
        <span className="text-xl font-bold text-color-primary">
          {totalVenues}
        </span>
        Venues
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xl font-bold text-color-primary">
          {totalBookings}
        </span>
        Bookings
      </div>
      <div className="flex flex-col items-center">
        <span className="text-xl font-bold text-color-primary">
          ${Math.round(totalEarnings)}
        </span>
        Earnings
      </div>
    </div>
  );
};

export default ManagerStats;
