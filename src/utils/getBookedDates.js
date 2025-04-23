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
