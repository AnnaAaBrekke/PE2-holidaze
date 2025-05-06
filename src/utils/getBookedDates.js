/**
 * Generates an array of date strings representing all booked dates
 * between the `dateFrom` and `dateTo` values in each booking.
 *
 * @function
 * @param {Array<Object>} [bookings=[]] - An array of booking objects.
 * @param {string} bookings[].dateFrom - Start date of the booking (ISO string).
 * @param {string} bookings[].dateTo - End date of the booking (ISO string).
 * @returns {string[]} An array of booked date strings (e.g., "Mon May 06 2024").
 */

const getBookedDates = (bookings = []) => {
  const dates = [];

  bookings.forEach((booking) => {
    const start = new Date(booking.dateFrom);
    const end = new Date(booking.dateTo);
    const current = new Date(start);

    while (current <= end) {
      dates.push(new Date(current).toDateString());
      current.setDate(current.getDate() + 1);
    }
  });

  return dates;
};

export default getBookedDates;
