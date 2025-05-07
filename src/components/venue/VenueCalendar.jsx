/**
 * VenueCalendar - Displays a calendar with booked dates disabled.
 *
 * @component
 * @param {Object} props
 * @param {Array<Object>} props.bookings - List of booking objects.
 * @param {string} props.bookings[].dateFrom - Start date of the booking (ISO string).
 * @param {string} props.bookings[].dateTo - End date of the booking (ISO string).
 * @returns {JSX.Element} A calendar with booked and past dates disabled.
 */

import { useMemo } from "react";
import getBookedDates from "../../utils/getBookedDates";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const VenueCalendar = ({ bookings = [] }) => {
  const bookedDates = useMemo(() => getBookedDates(bookings), [bookings]);

  const isBooked = (date) => bookedDates.includes(date.toDateString());

  return (
    <div>
      <Calendar
        tileDisabled={({ date }) => isBooked(date) || date < new Date()}
      />
      <p>Booked dates are grey.</p>
    </div>
  );
};

export default VenueCalendar;
