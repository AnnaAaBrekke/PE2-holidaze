/**
 * ManagerStats - Displays total venue count, bookings, and estimated earnings
 * for a venue manager based on provided venue data.
 *
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.venues - List of venue objects managed by the user.
 * @param {number} props.venues[].price - Price per night for the venue.
 * @param {Array<Object>} [props.venues[].bookings] - List of bookings for the venue.
 * @param {string} props.venues[].bookings[].dateFrom - Booking start date.
 * @param {string} props.venues[].bookings[].dateTo - Booking end date.
 * @returns {JSX.Element} A display of total venues, bookings, and earnings.
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
